---
layout: post
title: rfunctions Package on Github
---

This post is mostly an attempt to familiarize myself with Rmarkdown, jekyll, and github. I recently posted an R package ([rfunctions](http://github.com/jaredhuling/rfunctions)), which contains some functions I wrote (or modified) that make my life a little easier. I'll go through some examples in R to highlight the various functions included.

## Installation

**rfunctions** is not available on CRAN, but can be installed using the R package **devtools**. **rfunctions** can be installed with the following R code:


```r
# devtools::install_github('jaredhuling/rfunctions')
library(rfunctions)
```


## Accelerated crossprod function

A project I've been working on requires fast evaluation of $X^TX$ for a design matrix $X$. I found a great example in the paper for [RcppEigen](http://www.jstatsoft.org/v52/i05/paper) by Douglas Bates and Dirk Eddelbuettel for just such a thing. **RcppEigen** provides a simple and effective interfact between R and the blazing-fast **Eigen** C++ library for numerical linear algebra. Their example uses **inline**, a nice tool for inline C++ code in R, and I a made a proper **R** function from that. The following showcases the speed of **Eigen**. Note that since $X^TX$ is symmetric, we only have to compute half of the values, which further reduces computation time. 


```r
n.obs <- 10000
n.vars <- 100

x <- matrix(rnorm(n.obs * n.vars), n.obs, n.vars)

library(microbenchmark)

microbenchmark(crossprodcpp(x), crossprod(x), times = 25L)
```

```
## Unit: milliseconds
##             expr   min    lq median    uq   max neval
##  crossprodcpp(x) 14.03 14.23  14.32 14.44 14.82    25
##     crossprod(x) 61.84 62.07  62.44 63.02 66.46    25
```

```r
all.equal(crossprodcpp(x), crossprod(x))
```

```
## [1] TRUE
```


```crossprodcpp``` can also compute a weighted cross product $X^T W X$ where $W$ is a diagonal weight matrix


```r
ru <- runif(n.obs)
weights <- ru * (1 - ru)

microbenchmark(crossprodcpp(x, weights), crossprod(x, weights * x), times = 25L)
```

```
## Unit: milliseconds
##                       expr    min     lq median    uq    max neval
##   crossprodcpp(x, weights)  18.81  19.19  19.37  19.9  21.06    25
##  crossprod(x, weights * x) 126.08 127.09 127.40 129.5 152.22    25
```

```r
all.equal(crossprodcpp(x, weights), crossprod(x, weights * x))
```

```
## [1] TRUE
```



## Largest Singular Value Computation

The Lanczos algorithm is a well-known method for fast computation of extremal eigenvalues. The Golub-Kahan-Lanczos bidiagonalization algorithm is an extension of this to approximate the largest singular values of a matrix $X$ from below. The function ```gklBidiag``` approximates the largest singular value of a matrix. Since GKL bidiagonalization is initialized from a random vector, we can compute a probabilistic upper bound for the singular value. The following compares the speed of ```gklBidiag``` and the implementation in the popular **Fortran** library **PROPACK** found in the **svd** package 


```r
library(svd)

microbenchmark(gklBidiag(x, runif(ncol(x)), maxit = 30L), propack.svd(x, neig = 1L, 
    opts = list(kmax = 30L)))
```

```
## Unit: milliseconds
##                                                expr    min     lq median
##           gklBidiag(x, runif(ncol(x)), maxit = 30L)  36.23  37.03  37.74
##  propack.svd(x, neig = 1L, opts = list(kmax = 30L)) 401.32 406.85 414.47
##      uq    max neval
##   41.15  79.08   100
##  441.68 682.10   100
```

```r

gklBidiag(x, runif(ncol(x)), maxit = 30L)$d - propack.svd(x, neig = 1L, opts = list(kmax = 30L))$d
```

```
## [1] -4.548e-09
```



As ```gklBidiag``` also works on sparse matrices (of the ```SparseMatrix``` class from the **Matrix** package), I can showcase another function in **rfunctions**, ```simSparseMatrix```, which unsurprisingly simulates matrices with very few nonzero values. The nonzero values can either be all 1's or generated from a normal distribution. The level of sparsity of the simulated matrix can be specified



```r
n.obs <- 1e+05
n.vars <- 1000

# simulate a very sparse matrix (this matrix has many zeros and few ones)
x.sparse.bool <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), boolean = T)
x.sparse.contin <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), 
    boolean = F)

# reorthogonalization sometimes leads to higher accuracy. it helps correct
# for floating-point errors
microbenchmark(gklBidiag(x.sparse.bool, runif(n.vars), maxit = 10L, 0L), gklBidiag(x.sparse.contin, 
    runif(n.vars), maxit = 10L, 0L))
```

```
## Unit: milliseconds
##                                                        expr   min    lq
##    gklBidiag(x.sparse.bool, runif(n.vars), maxit = 10L, 0L) 93.50 94.21
##  gklBidiag(x.sparse.contin, runif(n.vars), maxit = 10L, 0L) 93.37 93.94
##  median    uq   max neval
##   94.82 96.20 122.1   100
##   94.64 95.83 125.2   100
```

```r

gklBidiag(x.sparse.bool, runif(n.vars), maxit = 10L, 0L)$d
```

```
## [1] 104.9
```

```r
gklBidiag(x.sparse.contin, runif(n.vars), maxit = 10L, 0L)$d
```

```
## [1] 35.25
```


##Faster Addition/Subtraction of Matrices

This may seem pointless, but I wrote functions to add and subtract matrices. It turns out my functions are faster than using the ```+``` and ```-``` operators. I'm sure someone will be quick to point out why using my ```add()``` and ```subtract()``` functions is silly and a bad idea.


```r
A <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), boolean = F)
B <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), boolean = F)

microbenchmark(add(A, B), A + B)
```

```
## Unit: milliseconds
##       expr    min     lq median     uq   max neval
##  add(A, B)  91.16  92.21  93.14  95.13 203.6   100
##      A + B 246.68 249.15 251.43 256.36 388.7   100
```

```r
microbenchmark(subtract(A, B), A - B)
```

```
## Unit: milliseconds
##            expr    min     lq median    uq   max neval
##  subtract(A, B)  91.31  93.56  94.53  99.9 173.7   100
##           A - B 250.87 256.39 265.24 324.5 550.6   100
```

```r

all.equal(add(A, B), A + B)
```

```
## [1] TRUE
```

```r
all.equal(subtract(A, B), A - B)
```

```
## [1] TRUE
```


The ```add()``` and ```subtract()``` methods for dense matrices are slower than the corresponding operators, so they're only worth using when you have sparse matrices.


```r
n.obs <- 1000
n.vars <- 1000

A <- matrix(rnorm(n.obs * n.vars), n.obs, n.vars)
B <- matrix(rnorm(n.obs * n.vars), n.obs, n.vars)

microbenchmark(add(A, B), A + B)
```

```
## Unit: milliseconds
##       expr   min    lq median    uq   max neval
##  add(A, B) 5.919 7.201  7.307 7.523 66.56   100
##      A + B 1.980 3.499  3.534 3.594 60.99   100
```

```r
microbenchmark(subtract(A, B), A - B)
```

```
## Unit: milliseconds
##            expr   min    lq median    uq   max neval
##  subtract(A, B) 5.991 7.250  7.359 7.578 50.69   100
##           A - B 2.043 3.491  3.549 3.602 47.08   100
```

```r

all.equal(add(A, B), A + B)
```

```
## [1] TRUE
```

```r
all.equal(subtract(A, B), A - B)
```

```
## [1] TRUE
```



