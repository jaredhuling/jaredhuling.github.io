---
layout: post
title: Fast and Big Linear Model Fitting with bigmemory and RcppEigen
tags: [R, C++, Eigen]
---


In a previous [post](http://casualinference.org/2016/06/04/bigmemory_rcppeigen/), I went over the basics of linking up [bigmemory](www.bigmemory.org) and the [eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) C++ library via [RcppEigen](http://cran.r-project.org/web/packages/RcppEigen/index.html). In this post I'll take this a bit further by creating a version of the ```fastLm()``` function of RcppEigen that can accept bigmemory objects. By doing so, we will create a fast way to fit linear models using data which is too big to fit in RAM. With RcppEigen, fitting linear models using out-of-memory computation doesn't have to be slow. The code for this is all on github in the [bigFastlm](https://github.com/jaredhuling/bigFastlm) package. 

Before we even start, most of the work is already done as we'll just need to change a few lines of the core C++ code of the ```fastLm()``` function so that it we can map the bigmemory pointer to data on disk to an eigen matrix object. 

The core code of ```fastLm``` can be found [here](https://github.com/RcppCore/RcppEigen/tree/master/src). The data object which is being loaded into C++ from R is mapped to an eigen matrix object at line 208 of ```fastLm.cpp```. 


{% highlight cpp %}
const Map<MatrixXd>  X(as<Map<MatrixXd> >(Xs));
{% endhighlight %}

We need to change the above code to 


{% highlight cpp %}
XPtr<BigMatrix> bMPtr(Xs);

unsigned int typedata = bMPtr->matrix_type();

if (typedata != 8)
{
  throw Rcpp::exception("type for provided big.matrix not available");
}

const Map<MatrixXd>  X = Map<MatrixXd>((double *)bMPtr->matrix(), bMPtr->nrow(), bMPtr->ncol()  );
{% endhighlight %}

The above modification first takes Xs as an [Rcpp external pointer object](http://www.r-bloggers.com/external-pointers-with-rcpp/) (```XPtr```) and then checks to make sure it's a double type (for now I'm ignoring all other data types (int, etc) for simplicity). Now that X is a mapped eigen matix object which points to data on disk, what else do we need to do? Well, not much! We just need to make sure that the correct object types are defined for the R-callable function. To do this, we need to change 


{% highlight cpp %}
// [[Rcpp::export]]
Rcpp::List fastLm_Impl(Rcpp::NumericMatrix X, Rcpp::NumericVector y, int type) {
    return lmsol::fastLm(X, y, type); 
}
{% endhighlight %}

To 


{% highlight cpp %}
// [[Rcpp::export]]
RcppExport SEXP bigLm_Impl(SEXP X, SEXP y, SEXP type)
{
  BEGIN_RCPP
  Rcpp::RObject __result;
  Rcpp::RNGScope __rngScope;
  Rcpp::traits::input_parameter< Rcpp::XPtr<BigMatrix> >::type X_(X);
  Rcpp::traits::input_parameter< Rcpp::NumericVector >::type y_(y);
  Rcpp::traits::input_parameter< int >::type type_(type);
  __result = Rcpp::wrap(lmsol::fastLm(X_, y_, type_));
  return __result;
  END_RCPP
}
{% endhighlight %}

in```fastLm.cpp```. ```// [[Rcpp::export]]``` had some trouble doing this automatically, so the above is just what that *should* have created. 

So now with the proper R functions to call this, we're basically done. I had to create a few utility functions to make everything work nicely, but the main work is just the above. 

One important detail: for now, we can only use the LLT and LDLT methods for computation, as the other decompositions create objects which scale with the size of the data, so for now I'm ignoring the more robust decompositions like QR. Perhaps someone else can figure out how to perform these in a memory-conscious manner.     

### Comparison with biglm

Now we'll run a (perhaps not-so-fair) comparison with the ```biglm``` function of [biglm](https://cran.r-project.org/web/packages/biglm/index.html). Specifically, we'll use the ```biglm.big.matrix``` function provided by the [biganalytics](https://cran.r-project.org/web/packages/biganalytics/index.html) which interfaces bigmemory and biglm. The following code creates a bigmemory object on disk (actually, two because biglm requires the matrix object to contain the response, whereas bigFastlm requires that the response be an R vector. It's hard to say which is a better design choice, but I'm sticking with the approach which doesn't allow an R formula expression). 


{% highlight r %}
suppressMessages(library(bigmemory))
suppressMessages(library(biganalytics))
suppressMessages(library(bigFastlm))

nrows <- 1000000
ncols <- 100
bkFile <- "big_matrix.bk"
descFile <- "big_matrix.desc"
big_mat <- filebacked.big.matrix(nrow           = nrows, 
                                 ncol           = ncols, 
                                 type           = "double",  
                                 backingfile    = bkFile, 
                                 backingpath    = ".", 
                                 descriptorfile = descFile,
                                 dimnames       = c(NULL, NULL))

set.seed(123)
for (i in 1:ncols) big_mat[, i] = rnorm(nrows, mean = 1/sqrt(i)) * i


bkFile <- "big_matrix2.bk"
descFile <- "big_matrix2.desc"
big_mat2 <- filebacked.big.matrix(nrow           = nrows, 
                                  ncol           = ncols + 1, 
                                  type           = "double",  
                                  backingfile    = bkFile, 
                                  backingpath    = ".", 
                                  descriptorfile = descFile,
                                  dimnames       = c(NULL, NULL))

for (i in 1:ncols) big_mat2[, i + 1] = big_mat[, i]


y <- rnorm(nrows)
big_mat2[,1] <- y

options(bigmemory.allow.dimnames=TRUE)
colnames(big_mat2) <- c("y", paste0("V", 1:ncols))

options(bigmemory.allow.dimnames=FALSE)

## create formula for biglm
form <- as.formula(paste("y ~ -1 +", paste(paste0("V", 1:ncols), collapse = "+")))
{% endhighlight %}

Now let's see how ```biglm``` and ```bigLm``` (eigen + bigmemory) stack up. Note that this is an unfair comparison because ```biglm``` requires a formula argument and ```bigLm``` assumes you're passing in a design matrix already and biglm uses the QR decomposition, which is slower than LLT or LDLT. 


{% highlight r %}
library(microbenchmark)

res <- microbenchmark(biglm.obj  <- biglm.big.matrix(form, data = big_mat2), 
                      bigLm.obj  <- bigLm(big_mat, y),     
                      bigLm.obj2 <- bigLmPure(big_mat, y), ## a slightly faster version that doesn't check for intercept
                      times = 10L)
print(summary(res)[,1:7], digits = 4)
{% endhighlight %}



{% highlight text %}
##                                                   expr    min     lq
## 1 biglm.obj <- biglm.big.matrix(form, data = big_mat2) 20.408 21.979
## 2                       bigLm.obj <- bigLm(big_mat, y)  1.720  1.769
## 3                  bigLm.obj2 <- bigLmPure(big_mat, y)  1.624  1.631
##     mean median     uq    max
## 1 22.987 22.788 23.981 25.995
## 2  1.825  1.793  1.867  2.055
## 3  1.673  1.669  1.693  1.741
{% endhighlight %}



{% highlight r %}
max(abs(coef(biglm.obj) - coef(bigLm.obj)))
{% endhighlight %}



{% highlight text %}
## [1] 5.551115e-17
{% endhighlight %}

```bigLm``` seems to be quite a bit faster than ```biglm```, but how fast is ```bigLm``` compared with ```fastLm``` (which requires the data to be loaded into memory)? It turns out it's pretty close on my computer and I don't even have anything fancy like a solid state drive.



{% highlight r %}
suppressMessages(library(RcppEigen))

mat.obj <- big_mat[,]

## both using the LLT decomposition
res <- microbenchmark(fastLm.obj.llt   <- fastLm(mat.obj, y, method = 2L),     # LLT Cholesky
                      bigLm.obj.llt    <- bigLm(big_mat, y),                   # LLT Cholesky
                      fastLm.obj2      <- fastLmPure(mat.obj, y, method = 2L),
                      bigLm.obj2       <- bigLmPure(big_mat, y),  ## a slightly faster version that doesn't check for intercept
                      fastLm.obj.ldlt  <- fastLmPure(mat.obj, y, method = 3L), # LDLT Cholesky
                      bigLm.obj.ldlt   <- bigLmPure(big_mat, y, method = 1L),  # LDLT Cholesky 
                      fastLm.obj.qrpiv <- fastLmPure(mat.obj, y, method = 0L), # column-pivoted QR
                      fastLm.obj.qr    <- fastLmPure(mat.obj, y, method = 1L), # unpivoted QR
                      times = 25L)
print(summary(res)[,1:7], digits = 4)
{% endhighlight %}



{% highlight text %}
##                                                      expr    min     lq
## 1       fastLm.obj.llt <- fastLm(mat.obj, y, method = 2L)  4.517  4.732
## 2                      bigLm.obj.llt <- bigLm(big_mat, y)  1.726  1.784
## 3      fastLm.obj2 <- fastLmPure(mat.obj, y, method = 2L)  1.629  1.668
## 4                     bigLm.obj2 <- bigLmPure(big_mat, y)  1.611  1.667
## 5  fastLm.obj.ldlt <- fastLmPure(mat.obj, y, method = 3L)  1.598  1.658
## 6    bigLm.obj.ldlt <- bigLmPure(big_mat, y, method = 1L)  1.617  1.690
## 7 fastLm.obj.qrpiv <- fastLmPure(mat.obj, y, method = 0L) 12.072 13.119
## 8    fastLm.obj.qr <- fastLmPure(mat.obj, y, method = 1L)  9.386  9.772
##     mean median     uq    max
## 1  5.390  5.658  5.849  6.728
## 2  1.932  1.820  1.878  3.325
## 3  1.719  1.678  1.709  2.351
## 4  1.754  1.677  1.742  2.266
## 5  1.741  1.677  1.749  2.373
## 6  1.780  1.726  1.829  2.145
## 7 13.240 13.195 13.356 14.714
## 8 10.228 10.135 10.486 12.356
{% endhighlight %}



{% highlight r %}
max(abs(coef(fastLm.obj) - coef(bigLm.obj)))
{% endhighlight %}



{% highlight text %}
## Error in coef(fastLm.obj): object 'fastLm.obj' not found
{% endhighlight %}

Future work would be to try to figure out how to make the QR decomposition memory-feasible and also to write a function for generalized linear models. 

