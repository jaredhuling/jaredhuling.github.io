---
layout: page
title: Software
permalink: /software/
---

<div class="software-list">

  <!-- ==================== personalized ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/subgroups.png" alt="personalized">
    </div>
    <div class="software-content">
      <h4 class="software-name"><a href="http://jaredhuling.org/personalized">personalized</a></h4>
      <p class="software-subtitle">Estimation and validation methods for subgroup identification and personalized medicine</p>
      <p>Designed for the analysis of data where the effect of a treatment or intervention may vary across patients. Works with data from randomized controlled trials or observational studies. Provides fitting and validation of subgroup identification and personalized medicine models under the general subgroup identification framework of <a href="https://doi.org/10.1111/biom.12676">Chen et al. (2017)</a>.</p>
      <div class="software-footer">
        <a href="https://cran.r-project.org/package=personalized"><img src="https://cranlogs.r-pkg.org/badges/grand-total/personalized" alt="CRAN downloads"></a>
        <div class="links">
          <a href="http://jaredhuling.github.io/personalized/">Docs</a>
          <a href="https://cran.r-project.org/package=personalized">CRAN</a>
          <a href="https://github.com/jaredhuling/personalized">GitHub</a>
          <a href="http://jaredhuling.org/personalized">Website</a>
          <a href="https://www.jstatsoft.org/article/view/v098i05">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== forestBalance ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/kernel_balancing_viz.png" alt="forestBalance">
    </div>
    <div class="software-content">
      <h4 class="software-name"><a href="http://jaredhuling.org/forestBalance">forestBalance</a></h4>
      <p class="software-subtitle">High-dimensional distributional confounding control with adaptive forest weights</p>
      <p>Implements the methodology of <a href="https://arxiv.org/abs/2512.18069">De and Huling (2025)</a>, constructing weights that minimize a measure of distributional distance between treated and control groups that emphasizes confounding variables. The approach works by first jointly modeling the relationship between covariates, outcome, and treatment and then creates a similarity measure that assesses how much two points share a similar confounding structure. This distance emphasizes balance of variables that affect both treatment and outcome, thereby dealing with high dimensional settings when not all variables are confounders.</p>
      <div class="software-footer">
        <div class="links">
          <a href="https://github.com/jaredhuling/forestBalance">GitHub</a>
          <a href="http://jaredhuling.org/forestBalance">Website</a>
          <a href="https://arxiv.org/abs/2512.18069">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== independenceWeights ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/dcow_adjusted.png" alt="independenceWeights">
    </div>
    <div class="software-content">
      <h4 class="software-name">independenceWeights</h4>
      <p class="software-subtitle">Confounding control for continuous-valued exposures</p>
      <p>Implements the methodology of <a href="https://arxiv.org/abs/2107.07086">Huling, Greifer, and Chen (2021)</a>, constructing weights that minimize the weighted statistical dependence between a continuous treatment/exposure and a vector of confounders. Because confounding bias is a function of this dependence, these weights mitigate confounding bias directly without requiring a parametric propensity model.</p>
      <div class="software-footer">
        <a href="https://cran.r-project.org/package=independenceWeights"><img src="https://cranlogs.r-pkg.org/badges/grand-total/independenceWeights" alt="CRAN downloads"></a>
        <div class="links">
          <a href="https://cran.r-project.org/package=independenceWeights">CRAN</a>
          <a href="https://github.com/jaredhuling/independenceWeights">GitHub</a>
          <a href="https://arxiv.org/abs/2107.07086">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== swjm ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/tAUC_readm_test_Coop_Lasso_Group.png" alt="tAUC">
    </div>
    <div class="software-content">
      <h4 class="software-name"><a href="http://jaredhuling.org/swjm">swjm</a></h4>
      <p class="software-subtitle">Stagewise variable selection for joint models of semi-competing risks</p>
      <p class="software-author">Primarily written by Lingfeng Luo</p>
      <p>Implements a stagewise variable selection framework for estimating equations and deploy it for two high-dimensional semi-competing risks models, joint frailty model and joint scale-change model. In addition to the lasso and group lasso penalties, we implement the cooperative lasso penalty, which encourages the same sign for effects of the same covariate across the recurrent and terminal event models. </p>
      <div class="software-footer">
        <div class="links">
          <a href="https://github.com/jaredhuling/swjm">GitHub</a>
          <a href="http://jaredhuling.org/swjm">Website</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== hierNest ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/MDC_DRG_Illustration.png" alt="hierNest">
    </div>
    <div class="software-content">
      <h4 class="software-name"><a href="https://zirenjiang.github.io/hierNest/">hierNest</a></h4>
      <p class="software-subtitle">Penalized regression with hierarchical nested parameterization structure for heterogeneous populations</p>
      <p class="software-author">Written by Ziren Jiang</p>
      <p>Implements a high-dimensional regression model framework when covariate effects vary by subgroups. The focus here is when subgroups are hierarchically defined, such as in readmission prediction settings when regression models may be heterogeneous based on what primary diagnosis an individual had in their initial hospitalization. These diagnoses can then be grouped into larger categories, creating a hierarchical structure. Our approach collapses models by covariate, borrowing strength across groups when needed.</p>
      <div class="software-footer">
        <div class="links">
          <a href="https://github.com/ZirenJiang/hierNest">GitHub</a>
          <a href="https://ZirenJiang.github.io/hierNest/">Website</a>
          <a href="https://arxiv.org/abs/2603.19569">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== oem ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/mcp_path.png" alt="oem">
    </div>
    <div class="software-content">
      <h4 class="software-name"><a href="http://jaredhuling.org/oem">oem</a></h4>
      <p class="software-subtitle">Orthogonalizing EM algorithm for penalized regression</p>
      <p>Efficient computation for penalized regression models using the Orthogonalizing EM algorithm, designed for tall datasets. Supports lasso, MCP, SCAD, elastic net, group lasso, group MCP/SCAD, and more. Also available as a <a href="https://github.com/jaredhuling/OrthogEM.jl">Julia implementation</a>.</p>
      <div class="software-footer">
        <a href="https://cran.r-project.org/package=oem"><img src="https://cranlogs.r-pkg.org/badges/grand-total/oem" alt="CRAN downloads"></a>
        <div class="links">
          <a href="http://jaredhuling.github.io/oem/">Docs</a>
          <a href="https://cran.r-project.org/package=oem">CRAN</a>
          <a href="https://github.com/jaredhuling/oem">GitHub</a>
          <a href="http://jaredhuling.org/oem">Website</a>
          <a href="https://www.jstatsoft.org/article/view/v104i06">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== personalized2part ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/response_histograms_wide.png" alt="personalized2part">
    </div>
    <div class="software-content">
      <h4 class="software-name">personalized2part</h4>
      <p class="software-subtitle">Two-part individualized treatment rules for semi-continuous data</p>
      <p>Implements the methodology of <a href="https://doi.org/10.1080/01621459.2020.1801449">Huling, Smith, and Chen (2020)</a> for subgroup identification with semi-continuous outcomes. Uses a two-part (hurdle) framework to jointly model the binary and continuous components of the outcome, yielding a single treatment rule. High-dimensional settings are handled via a cooperative lasso penalty.</p>
      <div class="software-footer">
        <a href="https://cran.r-project.org/package=personalized2part"><img src="https://cranlogs.r-pkg.org/badges/grand-total/personalized2part" alt="CRAN downloads"></a>
        <div class="links">
          <a href="http://jaredhuling.github.io/personalized2part/">Docs</a>
          <a href="https://cran.r-project.org/package=personalized2part">CRAN</a>
          <a href="https://github.com/jaredhuling/personalized2part">GitHub</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== hierSDR ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/central_mean_subspaces.png" alt="hierSDR">
    </div>
    <div class="software-content">
      <h4 class="software-name">hierSDR</h4>
      <p class="software-subtitle">Hierarchical sufficient dimension reduction</p>
      <p>Semiparametric sufficient dimension reduction for settings where population heterogeneity is defined by binary stratifying factors (e.g., chronic conditions in hospital risk modeling). Dimension reduction conforms to the hierarchical relationships between subpopulations, enabling tailored and interpretable models.</p>
      <div class="software-footer">
        <a href="https://cran.r-project.org/package=hierSDR"><img src="https://cranlogs.r-pkg.org/badges/grand-total/hierSDR" alt="CRAN downloads"></a>
        <div class="links">
          <a href="https://cran.r-project.org/package=hierSDR">CRAN</a>
          <a href="https://github.com/jaredhuling/hierSDR">GitHub</a>
          <a href="https://arxiv.org/abs/2212.12394">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== vennLasso ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/venn.png" alt="vennLasso">
    </div>
    <div class="software-content">
      <h4 class="software-name"><a href="http://jaredhuling.org/vennLasso">vennLasso</a></h4>
      <p class="software-subtitle">Variable selection for heterogeneous populations</p>
      <p>Variable selection for high-dimensional models where population heterogeneity is defined by binary stratifying factors. Yields sparsity patterns that adhere to the hierarchical structure among subpopulations, enabling structured, interpretable variable selection across groups.</p>
      <div class="software-footer">
        <a href="https://cran.r-project.org/package=vennLasso"><img src="https://cranlogs.r-pkg.org/badges/grand-total/vennLasso" alt="CRAN downloads"></a>
        <div class="links">
          <a href="http://jaredhuling.github.io/vennLasso/">Docs</a>
          <a href="https://cran.r-project.org/package=vennLasso">CRAN</a>
          <a href="https://github.com/jaredhuling/vennLasso">GitHub</a>
          <a href="http://jaredhuling.org/vennLasso">Website</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== groupFusedMulti ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/doubly_sparse.png" alt="groupFusedMulti">
    </div>
    <div class="software-content">
      <h4 class="software-name">groupFusedMulti</h4>
      <p class="software-subtitle">Doubly structured variable selection for grouped multivariate outcomes</p>
      <p>Penalized estimation for high-dimensional regression with multivariate outcomes that have a natural group structure. Implements the methodology of <a href="https://arxiv.org/abs/2302.11098">Huling et al. (2023)</a>.</p>
      <div class="software-footer">
        <div class="links">
          <a href="https://github.com/jaredhuling/groupFusedMulti">GitHub</a>
          <a href="https://arxiv.org/abs/2302.11098">Paper</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== personalizedLong ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/benefit_of_sr_assignments_by_received_paper.png" alt="personalizedLong">
    </div>
    <div class="software-content">
      <h4 class="software-name">personalizedLong</h4>
      <p class="software-subtitle">Fused comparative intervention scoring for long-term interventions</p>
      <p>Estimation of individualized intervention rules for long-term treatments whose effects change smoothly over time and vary across a population. Implements the fused comparative intervention scoring methodology for heterogeneous longitudinal intervention effects.</p>
      <div class="software-footer">
        <div class="links">
          <a href="https://github.com/jaredhuling/personalizedLong">GitHub</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ==================== aftiv ==================== -->
  <div class="software-entry">
    <div class="software-img">
      <img src="/images/talks/iv_assumptions.png" alt="aftiv">
    </div>
    <div class="software-content">
      <h4 class="software-name">aftiv</h4>
      <p class="software-subtitle">Instrumental variable estimation under the semiparametric AFT model</p>
      <p>Instrumental variable estimation for time-to-event outcomes under the semiparametric accelerated failure time model.</p>
      <div class="software-footer">
        <div class="links">
          <a href="https://github.com/jaredhuling/aftiv">GitHub</a>
        </div>
      </div>
    </div>
  </div>

</div>
