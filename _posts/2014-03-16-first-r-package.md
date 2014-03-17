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

A project I've been working on requires fast evaluation of $$X^TX$$ for a design matrix $$X$$. I found a great example in the paper for [RcppEigen](http://www.jstatsoft.org/v52/i05/paper) by Douglas Bates and Dirk Eddelbuettel for just such a thing. **RcppEigen** provides a simple and effective interfact between R and the blazing-fast **Eigen** C++ library for numerical linear algebra. Their example uses **inline**, a nice tool for inline C++ code in R, and I a made a proper **R** function from that. The following showcases the speed of **Eigen**. Note that since $$X^TX$$ is symmetric, we only have to compute half of the values, which further reduces computation time. 


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
##  crossprodcpp(x) 14.11 14.43  15.06 18.97 23.86    25
##     crossprod(x) 62.91 64.87  66.59 70.90 77.83    25
{% endhighlight %}



{% highlight r %}
all.equal(crossprodcpp(x), crossprod(x))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}


```crossprodcpp``` can also compute a weighted cross product $$X^T W X$$ where $$W$$ is a diagonal weight matrix


{% highlight r %}
ru <- runif(n.obs)
weights <- ru * (1 - ru)

microbenchmark(crossprodcpp(x, weights), crossprod(x, weights * x), times = 25L)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##                       expr   min     lq median     uq    max neval
##   crossprodcpp(x, weights)  18.9  18.99  19.22  19.75  23.21    25
##  crossprod(x, weights * x) 122.1 125.33 126.25 129.54 145.19    25
{% endhighlight %}



{% highlight r %}
all.equal(crossprodcpp(x, weights), crossprod(x, weights * x))
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



## Largest Singular Value Computation

The Lanczos algorithm is a well-known method for fast computation of extremal eigenvalues. The Golub-Kahan-Lanczos bidiagonalization algorithm is an extension of this to approximate the largest singular values of a matrix $$X$$ from below. The function ```gklBidiag``` approximates the largest singular value of a matrix. Since GKL bidiagonalization is initialized from a random vector, we can compute a probabilistic upper bound for the singular value. The following compares the speed of ```gklBidiag``` and the implementation in the popular **Fortran** library **PROPACK** found in the **svd** package 


{% highlight r %}
library(svd)

v <- runif(ncol(x))  #initialization for GKL-bidiag
opts <- list(kmax = 30L)
microbenchmark(gklBidiag(x, v, maxit = 30L), .Call("propack_svd", x, 1L, opts, 
    PACKAGE = "svd"))
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##                                                expr    min     lq median
##                        gklBidiag(x, v, maxit = 30L)  37.66  38.19  38.99
##  .Call("propack_svd", x, 1L, opts, PACKAGE = "svd") 346.55 352.13 358.61
##      uq   max neval
##   44.59  73.3   100
##  386.24 674.3   100
{% endhighlight %}



{% highlight r %}

gklBidiag(x, v, maxit = 30L)$d - .Call("propack_svd", x, 1L, opts, PACKAGE = "svd")$d
{% endhighlight %}



{% highlight text %}
## [1] -3.411e-10
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
##                                  expr   min    lq median    uq   max neval
##  gklBidiag(x.s.b, v, maxit = 10L, 0L) 94.51 95.38  96.64 99.67 138.8   100
##  gklBidiag(x.s.c, v, maxit = 10L, 0L) 94.60 95.35  96.46 99.34 143.7   100
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
## [1] 35.71
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
##  add(A, B)  87.77  92.54  94.51 104.0 207.6   100
##      A + B 240.39 354.31 361.31 368.9 482.4   100
{% endhighlight %}



{% highlight r %}
microbenchmark(subtract(A, B), A - B)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##            expr    min     lq median    uq   max neval
##  subtract(A, B)  88.12  93.32  95.71 103.9 249.7   100
##           A - B 243.27 359.10 365.65 371.7 429.7   100
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
##  add(A, B) 5.483 5.616  7.157 7.302 17.02   100
##      A + B 1.822 1.938  2.107 3.527 14.29   100
{% endhighlight %}



{% highlight r %}
microbenchmark(subtract(A, B), A - B)
{% endhighlight %}



{% highlight text %}
## Unit: milliseconds
##            expr   min    lq median    uq   max neval
##  subtract(A, B) 5.462 5.552  5.998 7.275 17.54   100
##           A - B 1.818 1.975  2.187 3.504 13.97   100
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



