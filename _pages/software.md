---
layout: page
title: Software
permalink: /software/
---


  <div class="docs-section">
    <h3>R Packages</h3>
  </div>

  
  
  <div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/subgroups.png" width="100%" alt="hdnom-icon" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">personalized</b>: Estimation and validation methods for subgroup identification and
    personalized medicine</h4>

        <p>
            The 'personalized' package is designed for the analysis of data where the effect of a treatment or intervention may vary for different patients. It can be used for either data from randomized controlled trials or observational studies and is not limited specifically to the analysis of medical data.
            It provides functions for fitting and validation of subgroup
      identification and personalized medicine models under the general subgroup
      identification framework of <a href="doi:10.1111/biom.12676">Chen et al. (2017)</a>.
        </p>

        <p align="right">
          <a href="http://jaredhuling.github.io/personalized/" class="button">Documentation</a>
          <a href="https://cran.r-project.org/package=personalized" class="button">Download</a>
          <a href="https://github.com/jaredhuling/personalized" class="button">Source</a>
        </p>

      </div>
    </div>

  </div>
  
  
  
  
<div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/dcow_adjusted.pdf" width="100%" alt="hdnom-icon" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">independenceWeights</b>: Estimates weights for confounding control for continuous-valued exposures</h4>

        <p>
          The independenceWeights package offers confounding control tools for studying the causal effects of a continuous exposure from observational data. It implements the methodology of <a href="https://arxiv.org/abs/2107.07086">Huling, Greifer, and Chen (2021)</a>, which constructs weights designed to minimize the weighted statistical dependence between a continuous treatment/exposure variable and a vector of confounder variables. In estimating a causal dose-response function, confounding bias is a function of the dependence between confounders and the exposure/treatment, so weights that minimize the dependence aim to mitigate confounding bias directly.
        </p>

        <p align="right">
          <a href="https://cran.r-project.org/package=independenceWeights" class="button">Download</a>
          <a href="https://github.com/jaredhuling/independenceWeights" class="button">Source</a>
          <a href="https://arxiv.org/abs/2107.07086" class="button">Paper</a>
        </p>

      </div>
    </div>

  </div>
  
  
  
  
  
  <div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/mcp_path.png" width="100%" alt="OEM" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">oem</b>: Orthogonalizing EM algorithm for penalized estimation</h4>

        <p>
          oem provides computation for various penalized regression models using the Orthogonalizing EM algorithm and is highly efficient for tall data. Penalties available include the lasso, MCP, SCAD, elastic net, group lasso, group MCP/SCAD, and more.
        </p>

        <p align="right">
          <a href="http://jaredhuling.github.io/oem/" class="button">Documentation</a>
          <a href="https://cran.r-project.org/package=oem" class="button">Download</a>
          <a href="https://github.com/jaredhuling/oem" class="button">Source</a><br><br>
          <a href="https://github.com/jaredhuling/OrthogEM.jl" class="button">Julia implementation</a>
        </p>

      </div>
    </div>

  </div>
  
  <div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/response_histograms_wide.png" width="100%" alt="hdnom-icon" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">personalized2part</b>: two part estimation of individualized treatment rules for semi-continuous data</h4>

        <p>
          The personalized2part package implements the methodology of <a href="https://doi.org/10.1080/01621459.2020.1801449">Huling, Smith, and Chen (2020)</a>, which allows for subgroup identification for semi-continuous outcomes by estimating individualized treatment rules. It uses a two part modeling (or hurdle modeling) framework to handle semi-continuous data by modeling separately the positive part of the outcome and an indicator of whether each outcome is positive, but still results in a single treatment rule. High dimensional data is handled with a cooperative lasso penalty, which encourages the coefficients in the two models to have the same sign.
        </p>

        <p align="right">
          <a href="http://jaredhuling.github.io/personalized2part/" class="button">Documentation</a>
          <a href="https://cran.r-project.org/package=personalized2part" class="button">Download</a>
          <a href="https://github.com/jaredhuling/personalized2part" class="button">Source</a>
        </p>

      </div>
    </div>

  </div>
  
  
  
  
  
  <div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/central_mean_subspaces.png" width="100%" alt="hdnom-icon" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">hierSDR</b>: Hierarchical sufficient dimension reduction</h4>

        <p>
          The hierSDR package provides semiparametric sufficient dimension reduction methods for modeling scenarios where heterogeneity is defined by several binary factors which stratify the population into multiple subpopulations. For example, hierSDR can be used in a hospital-wide risk modeling application if covariate effects in risk models differ for subpopulations of patients with different chronic conditions. Here the chronic conditions are the binary stratifying factors. The hierSDR package provides computation for dimension reduction methods that conform to the hierarchical nature of the relationships between the various subpopulations.
        </p>

        <p align="right">
          <a href="https://cran.r-project.org/package=hierSDR" class="button">Download</a>
          <a href="https://github.com/jaredhuling/hierSDR" class="button">Source</a>
          <a href="https://arxiv.org/abs/2212.12394" class="button">Paper</a>
        </p>

      </div>
    </div>

  </div>





  <div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/central_mean_subspaces.png" width="100%" alt="hdnom-icon" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">hierSDR</b>: Hierarchical sufficient dimension reduction</h4>

        <p>
          The groupFusedMulti package provides penalized estimation methods for high dimensional regression models for multivariate outcomes that have a natural group structure. This package implements the methodology of <a href="https://arxiv.org/abs/2302.11098">Huling, et al (2023)</a>.
        </p>

        <p align="right">
          <a href="https://github.com/jaredhuling/groupFusedMulti" class="button">Source</a>
          <a href="https://arxiv.org/abs/2302.11098" class="button">Paper</a>
        </p>

      </div>
    </div>

  </div>







<div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/venn.png" width="100%" alt="hdnom-icon" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">vennLasso</b>: Variable selection for heterogeneous populations</h4>

        <p>
          The vennLasso package provides variable selection for high-dimensional modeling scenarios where heterogeneity is defined by several binary factors which stratify the population into multiple subpopulations. For example, vennLasso can be used in a hospital-wide risk modeling application if covariate effects in risk models differ for subpopulations of patients with different chronic conditions. Here the chronic conditions are the binary stratifying factors. The vennLasso package provides computation for a variable selection method which yields variable selection patterns which adhere to the hierarchical nature of the relationships between the various subpopulations.
        </p>

        <p align="right">
          <a href="http://jaredhuling.github.io/vennLasso/" class="button">Documentation</a>
          <a href="https://cran.r-project.org/package=vennLasso" class="button">Download</a>
          <a href="https://github.com/jaredhuling/vennLasso" class="button">Source</a>
        </p>

      </div>
    </div>

  </div>



<div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/benefit_of_sr_assignments_by_received_paper.png" width="100%" alt="persLongitudinal" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">personalizedLong</b>: Fused comparative intervention scoring/subgroup identification for long-term interventions
</h4>

        <p>
          The personalizedLong package provides estimation of individualized intervention rules for long-term interventions and treatments. The underlying methodology of personalizedLong is intended for long-term interventions whose effects change smoothly over time and are heterogeneous effects across a population. The personalizedLong package provides an interface for the methodology proposed in ``Fused comparative intervention scoring for heterogeneity of longitudinal intervention effects''.
        </p>

        <p align="right">
          <a href="https://github.com/jaredhuling/personalizedLong" class="button">Source</a>
        </p>

      </div>
    </div>

  </div>


<div class="docs-section">

    <div class="row">

      <div class="four columns">
        <img src="/images/talks/iv_assumptions.png" width="100%" alt="AFT-IV" />
      </div>

      <div class="eight columns">

        <h4><b style="font-family:monospace">aftiv</b>: Instrumental variable estimation under the semiparametric AFT model
</h4>

        <p>
          The aftiv package provides instrumental variable estimation for time-to-event outcomes under the semiparametric accelerated failure time model.
        </p>

        <p align="right">
          <a href="https://github.com/jaredhuling/aftiv" class="button">Source</a>
        </p>

      </div>
    </div>

  </div>
  

