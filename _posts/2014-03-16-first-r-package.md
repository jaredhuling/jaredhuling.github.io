---
layout: post
title: rfunctions Package on Github
---

This post is mostly an attempt to familiarize myself with Rmarkdown, jekyll, and github. I recently posted an R package ([rfunctions](http://github.com/jaredhuling/rfunctions)), which contains some functions I wrote (or modified) that make my life a little easier. I'll go through some examples in R to highlight the various functions included.

## Installation

**rfunctions** is not available on CRAN, but can be installed using the R package **devtools**. **rfunctions** can be installed with the following R code:


{% highlight r %}
devtools::install_github("jaredhuling/rfunctions")
library(rfunctions)
{% endhighlight %}


## Accelerated crossprod function

A project I've been working on requires fast evaluation of $X^TX$ for a design matrix $X$. I found a great example in the [paper](http://www.jstatsoft.org/v52/i05/paper) for [RcppEigen](http://cran.r-project.org/web/packages/RcppEigen/index.html) by Douglas Bates and Dirk Eddelbuettel for just such a thing. **RcppEigen** provides a simple and effective interfact between R and the blazing-fast **Eigen** C++ library for numerical linear algebra. Their example uses **inline**, a nice tool for inline C++ code in R, and I a made a proper **R** function from that. The following showcases the speed of **Eigen**. Note that since $X^TX$ is symmetric, we only have to compute half of the values, which further reduces computation time. 


{% highlight r %}
n.obs <- 10000
n.vars <- 100

x <- matrix(rnorm(n.obs * n.vars), n.obs, n.vars)

library(microbenchmark)

microbenchmark(crossprodcpp(x), crossprod(x), times = 25L)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##             expr   min    lq median    uq   max neval
##  crossprodcpp(x) 13.97 14.07  14.26 14.54 15.90    25
##     crossprod(x) 61.53 61.88  62.08 62.72 79.11    25
{% endhighlight %}



{% highlight r %}
all.equal(crossprodcpp(x), crossprod(x))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}


```crossprodcpp``` can also compute a weighted cross product $X^T W X$ where $W$ is a diagonal weight matrix


{% highlight r %}
ru <- runif(n.obs)
weights <- ru * (1 - ru)

microbenchmark(crossprodcpp(x, weights), crossprod(x, weights * x), times = 25L)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##                       expr   min     lq median     uq    max neval
##   crossprodcpp(x, weights)  18.8  19.03  19.23  19.64  23.89    25
##  crossprod(x, weights * x) 126.0 128.20 132.16 145.06 228.21    25
{% endhighlight %}



{% highlight r %}
all.equal(crossprodcpp(x, weights), crossprod(x, weights * x))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



## Largest Singular Value Computation

The Lanczos algorithm is a well-known method for fast computation of extremal eigenvalues. The Golub-Kahan-Lanczos bidiagonalization algorithm is an extension of this to approximate the largest singular values of a matrix $X$ from below. The function ```gklBidiag``` approximates the largest singular value of a matrix. Since GKL bidiagonalization is initialized from a random vector, we can compute a probabilistic upper bound for the singular value. The following compares the speed of ```gklBidiag``` and the implementation in the popular **Fortran** library **PROPACK** found in the **svd** package 


{% highlight r %}
library(svd)

v <- runif(ncol(x))  #initialization for GKL-bidiag

propack <- function() .Call("propack_svd", x, 1L, opts = list(kmax = 30L), PACKAGE = "svd")
gklb <- function(v) gklBidiag(x, v, maxit = 30L)

microbenchmark(gklb(v), propack())
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##       expr    min     lq median     uq   max neval
##    gklb(v)  36.18  36.79  37.27  38.29 102.6   100
##  propack() 345.11 349.64 353.10 366.80 826.3   100
{% endhighlight %}



{% highlight r %}

gklBidiag(x, v, maxit = 30L)$d - .Call("propack_svd", x, 1L, opts = list(kmax = 30L), 
    PACKAGE = "svd")$d
{% endhighlight %}



{% highlight text %}
## [1] -2.672e-07
{% endhighlight %}



As ```gklBidiag``` also works on sparse matrices (of the ```SparseMatrix``` class from the **Matrix** package), I can showcase another function in **rfunctions**, ```simSparseMatrix```, which unsurprisingly simulates matrices with very few nonzero values. The nonzero values can either be all 1's or generated from a normal distribution. The level of sparsity of the simulated matrix can be specified



{% highlight r %}
n.obs <- 1e+05
n.vars <- 1000

# simulate a very sparse matrix (this matrix has many zeros and few ones)
x.s.b <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), boolean = T)
x.s.c <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), boolean = F)
v <- runif(n.vars)

# reorthogonalization sometimes leads to higher accuracy. it helps correct
# for floating-point errors
microbenchmark(gklBidiag(x.s.b, v, maxit = 10L, 0L), gklBidiag(x.s.c, v, maxit = 10L, 
    0L))
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##                                  expr   min    lq median     uq   max
##  gklBidiag(x.s.b, v, maxit = 10L, 0L) 94.19 95.34  96.43  99.99 156.2
##  gklBidiag(x.s.c, v, maxit = 10L, 0L) 94.40 95.55  96.62 100.53 138.6
##  neval
##    100
##    100
{% endhighlight %}



{% highlight r %}

gklBidiag(x.s.b, v, maxit = 10L, 0L)$d
{% endhighlight %}



{% highlight text %}
## [1] 104.9
{% endhighlight %}



{% highlight r %}
gklBidiag(x.s.c, v, maxit = 10L, 0L)$d
{% endhighlight %}



{% highlight text %}
## [1] 35.28
{% endhighlight %}


##Faster Addition/Subtraction of Matrices

This may seem pointless, but I wrote functions to add and subtract matrices. It turns out my functions are faster than using the ```+``` and ```-``` operators. I'm sure someone will be quick to point out why using my ```add()``` and ```subtract()``` functions is silly and a bad idea.


{% highlight r %}
A <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), boolean = F)
B <- simSparseMatrix(sparsity = 0.99, dim = c(n.obs, n.vars), boolean = F)

microbenchmark(add(A, B), A + B)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##       expr    min     lq median    uq   max neval
##  add(A, B)  92.42  93.44  100.9 105.1 217.0   100
##      A + B 259.20 366.90  385.4 393.5 628.1   100
{% endhighlight %}



{% highlight r %}
microbenchmark(subtract(A, B), A - B)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##            expr    min     lq median    uq   max neval
##  subtract(A, B)  93.28  96.47  104.1 113.6 363.7   100
##           A - B 275.81 393.90  404.8 439.3 625.3   100
{% endhighlight %}



{% highlight r %}

all.equal(add(A, B), A + B)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
all.equal(subtract(A, B), A - B)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}


The ```add()``` and ```subtract()``` methods for dense matrices are slower than the corresponding operators, so they're only worth using when you have sparse matrices.


{% highlight r %}
n.obs <- 1000
n.vars <- 1000

A <- matrix(rnorm(n.obs * n.vars), n.obs, n.vars)
B <- matrix(rnorm(n.obs * n.vars), n.obs, n.vars)

microbenchmark(add(A, B), A + B)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##       expr   min    lq median    uq   max neval
##  add(A, B) 6.978 7.299  8.101 9.532 35.47   100
##      A + B 3.364 3.528  3.879 4.552 31.41   100
{% endhighlight %}



{% highlight r %}
microbenchmark(subtract(A, B), A - B)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##            expr   min    lq median    uq   max neval
##  subtract(A, B) 6.986 7.183  7.373 7.708 24.84   100
##           A - B 3.381 3.490  3.547 3.733 23.74   100
{% endhighlight %}



{% highlight r %}

all.equal(add(A, B), A + B)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
all.equal(subtract(A, B), A - B)
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



