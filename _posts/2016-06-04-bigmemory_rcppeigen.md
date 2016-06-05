# Linking bigmemory and RcppEigen



The [bigmemory](www.bigmemory.org) [package](https://cran.r-project.org/web/packages/bigmemory/index.html) offers a set of tools for R which allow for manipulation larger-than-memory objects within R. It has some basic functions but is certainly not comprehensive. The [eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) C++ linear algebra library is a highly efficient numerical linear algebra library and can be interfaced to R through  [RcppEigen](http://cran.r-project.org/web/packages/RcppEigen/index.html) by Douglas Bates and Dirk Eddelbuettel. If bigmemory and Eigen can be linked, then one would be able to do highly efficient linear algebra computation on data that is too big for memory (exactly what you thought R couldn't do). 

Since bigmemory works with pointers to C++ objects, it's natural to link bigmemory objects to Eigen matrix objects. I'm not going to go too much into the details of this from the bigmemory/Rcpp side of things, as it's well exposed [here](http://gallery.rcpp.org/articles/using-bigmemory-with-rcpp/). 

In this post I'll create a ```colSums()``` function and a ```crossprod()``` function for ```big.matrix``` objects. ```big.matrix``` objects can have one of 4 types (1, 2, 4, 8), corresponding to (char, short, int, double), so we need to define extra Eigen matrix types like the following (```MatrixXi```/```VectorXi``` for ints and ```MatrixXd```/```VectorXd``` for doubles are already defined):


```cpp
typedef Eigen::Matrix<char, Eigen::Dynamic, Eigen::Dynamic> MatrixXchar;
typedef Eigen::Matrix<short, Eigen::Dynamic, Eigen::Dynamic> MatrixXshort;
typedef Eigen::Matrix<char, Eigen::Dynamic, 1> Vectorchar;
typedef Eigen::Matrix<short, Eigen::Dynamic, 1> Vectorshort;
```

Then ``reading'' in a big.matrix object from R to C++ and getting its data type looks like the following:


```cpp
RcppExport SEXP colsums_big(SEXP X_)
{
  BEGIN_RCPP
    using Eigen::Map;
    using Eigen::MatrixXd;
    using Eigen::VectorXd;
    
    typedef Eigen::Matrix<char, Eigen::Dynamic, Eigen::Dynamic> MatrixXchar;
    typedef Eigen::Matrix<short, Eigen::Dynamic, Eigen::Dynamic> MatrixXshort;
    typedef Eigen::Matrix<char, Eigen::Dynamic, 1> Vectorchar;
    typedef Eigen::Matrix<short, Eigen::Dynamic, 1> Vectorshort;
    
    XPtr<BigMatrix> xpMat(X_);
    
    unsigned int type = xpMat->matrix_type();
    
  END_RCPP
}

```

Then in order to associate the data from ```xpMat``` with an Eigen matrix object, we use the Eigen ```map``` ([map](https://eigen.tuxfamily.org/dox/group__TutorialMapClass.html))functionality to map the big.matrix data into an Eigen object (without copying it and hence loading it to memory). For data with the double type, this looks like:



```cpp
Map<MatrixXd> bM = Map<MatrixXd>((double *)xpMat->matrix(), xpMat->nrow(), xpMat->ncol()  );
```

where ```bM``` is the new Eigen object pointing to the big.matrix data located on disk. Now we are basically done. Performing the column-wise sum in Eigen is straightforward:


```cpp
VectorXd colSums = bM.colwise().sum();
return wrap(colSums);
```

Putting it altogether:


```cpp
RcppExport SEXP colsums_big(SEXP X_)
{
  BEGIN_RCPP
    using Eigen::Map;
    using Eigen::MatrixXd;
    using Eigen::VectorXd;
    
    typedef Eigen::Matrix<char, Eigen::Dynamic, Eigen::Dynamic> MatrixXchar;
    typedef Eigen::Matrix<short, Eigen::Dynamic, Eigen::Dynamic> MatrixXshort;
    typedef Eigen::Matrix<char, Eigen::Dynamic, 1> Vectorchar;
    typedef Eigen::Matrix<short, Eigen::Dynamic, 1> Vectorshort;
    
    XPtr<BigMatrix> xpMat(X_);
    
    unsigned int type = xpMat->matrix_type();
    
    if (type == 1) 
    {
      Map<MatrixXchar> bM = Map<MatrixXchar>((char *)xpMat->matrix(), xpMat->nrow(), xpMat->ncol()  );
      Vectorchar colSums = bM.colwise().sum();
      return wrap(colSums);
    } else if (type == 2) 
    {
      Map<MatrixXshort> bM = Map<MatrixXshort>((short *)xpMat->matrix(), xpMat->nrow(), xpMat->ncol()  );
      Vectorshort colSums = bM.colwise().sum();
      return wrap(colSums);
    } else if (type == 4) 
    {
      Map<MatrixXi> bM = Map<MatrixXi>((int *)xpMat->matrix(), xpMat->nrow(), xpMat->ncol()  );
      VectorXi colSums = bM.colwise().sum();
      return wrap(colSums);
    } else if (type == 8) 
    {
      Map<MatrixXd> bM = Map<MatrixXd>((double *)xpMat->matrix(), xpMat->nrow(), xpMat->ncol()  );
      VectorXd colSums = bM.colwise().sum();
      return wrap(colSums);
    } else {
      // We should never get here, but it resolves compiler warnings.
      throw Rcpp::exception("Undefined type for provided big.matrix");
    }

    END_RCPP
}

```

If we want to make a ```crossprod``` function for ```big.matrix``` objects (ie computing $X^TX$), then we would do this with the following:


```cpp
int p = bM.cols();
MatrixXi crossprod = MatrixXi(p, p).setZero().selfadjointView<Eigen::Upper>().rankUpdate( bM.adjoint() );
return wrap(crossprod);
```

Now let's run a big example to demonstrate the performance. The R function which calls ```colsums_big``` is called ```big.colSums()``` and the corresponding crossprod function is called ```big.crossprod()```. If we have a ```big.matrix``` object ```big_mat```, then the data can be loaded into memory as a matrix as ```big_mat[,]```, so we can compare with the standard R functions for ```colSums``` and ```crossprod```. 


```r
suppressMessages(library(bigmemory))
suppressMessages(library(rfunctions))

nrows <- 500000
ncols <- 500
bkFile <- "big_matrix.bk"
descFile <- "big_matrix.desc"
big_mat <- filebacked.big.matrix(nrow=nrows, ncol=ncols, type="double",  
                                backingfile=bkFile, backingpath=".", 
                                descriptorfile=descFile,
                                dimnames=c(NULL,NULL))

set.seed(123)
for (i in 1:ncols) big_mat[,i] = rnorm(nrows, mean = 1/sqrt(i))*i


library(microbenchmark)

res <- microbenchmark(cs1 <- colSums(big_mat[,]), 
                      cs2 <- big.colSums(big_mat), 
                      times = 25L)
print(summary(res)[,1:7], digits = 5)
```

```
##                          expr     min      lq    mean median      uq
## 1 cs1 <- colSums(big_mat[, ]) 1337.65 1453.05 1579.85 1482.4 1681.94
## 2 cs2 <- big.colSums(big_mat)  136.93  147.46  195.31  174.5  197.06
##       max
## 1 2237.82
## 2  688.96
```

```r
all.equal(cs1, cs2)
```

```
## [1] TRUE
```

The memory usage is obviously much lower when we don't load the big.matrix object into memory too. 


```r
## memory usage of loading the data
Rprof("base_mem.out", memory.profiling = TRUE)
# Call the function to be profiled
cs1 <- colSums(big_mat[,])
Rprof(NULL)
summaryRprof("base_mem.out", memory = "stats")[[1]][4]
```

```
## max.vsize.large 
##       250988341
```

```r
gc()
```

```
##           used (Mb) gc trigger   (Mb)  max used   (Mb)
## Ncells 1377602 73.6    2164898  115.7   1828123   97.7
## Vcells 1896930 14.5  290428868 2215.8 252343606 1925.3
```

```r
Rprof("eigen_mem.out", memory.profiling = TRUE)
# Call the function to be profiled
cs2 <- big.colSums(big_mat)
Rprof(NULL)
summaryRprof("eigen_mem.out", memory = "stats")[[1]][4]
```

```
## max.vsize.large 
##         1003188
```


```r
res <- microbenchmark(cp1 <- crossprod(big_mat[,]), 
                      cp2 <- big.crossprod(big_mat), 
                      times = 5L)
print(summary(res)[,1:7], digits = 4)
```

```
##                            expr   min    lq   mean median     uq    max
## 1 cp1 <- crossprod(big_mat[, ]) 96.45 98.67 103.07 103.64 106.02 110.56
## 2 cp2 <- big.crossprod(big_mat) 17.26 17.43  17.83  17.75  18.17  18.56
```

```r
all.equal(cp1, cp2)
```

```
## [1] TRUE
```

In a following post I'll investigate fitting linear models via Eigen and bigmemory ```big.matrix``` objects and see how the speed compares with the [biglm](https://cran.r-project.org/web/packages/biglm/index.html) package.  

