---
layout: page
title: Research
permalink: /research/
---

My research spans several interconnected areas in statistics and biostatistics,
with a unifying focus on addressing population heterogeneity to improve individual
health outcomes. Below are the main themes of my work, with key publications
from each area.

---

<div class="research-theme">
<h2 class="research-theme-title">Causal Inference</h2>
<p class="research-theme-desc">Development of principled methods for estimating causal effects from
observational data. Topics include weighting methods for continuous,
binary, and nonstandard treatments, modified treatment policies, handling violations of positivity and other standard causal
assumptions, methods for generalizability and transportability, estimating heterogeneous treatment effects, and more.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=causal-inference] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Weighting Methods for Causal Inference</h2>
<p class="research-theme-desc">A central challenge in observational studies is confounding: because
treatment is not randomly assigned, differences in outcomes across treatment
groups may reflect pre-existing differences in patient characteristics rather
than true causal effects. Weighting methods address this by reweighting the
observed sample so that covariate distributions are balanced across groups,
enabling valid causal comparisons.
Classical propensity score approaches can be sensitive to model
misspecification. I develop weighting approaches that are flexible,
user-friendly, and robust to complex confounding. This includes energy
balancing weights--a model-free method that directly minimizes distributional
imbalance, requiring no tuning parameters and no
secondary modeling decisions—-as well as independence weights for
continuous-valued treatments, modified treatment policy estimators based on
weighted energy distance, and more.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=weighting] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Precision Medicine &amp; Heterogeneity of Treatment Effect</h2>
<p class="research-theme-desc">Statistical methods for personalizing treatment decisions based on individual
patient characteristics and understanding heterogeneity of treatment effect. This includes estimation of optimal individualized
treatment rules, subgroup identification, and conditional average treatment effects. Includes methods for complex outcome
types, multi-category treatments, and high-dimensional data.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=precision-medicine || keywords~=individualized-treatment-rules] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Evidence Synthesis, Generalizability, Transportability, &amp; Data-Fusion</h2>
<p class="research-theme-desc">Methods for combining evidence and data across multiple studies while preserving
causal interpretability. This includes causally interpretable random-effects
meta-analysis, methods combining aggregate and individual participant data from randomized trials when targeting a target population,
and transportability of causal effects to target populations in the presence of patient nonadherence.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=meta-analysis || keywords~=transportability || keywords~=data-combining || keywords~=data-borrowing] --sort_by year --order descending %}
</div>
</div>



<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Population Heterogeneity &amp; Risk Prediction</h2>
<p class="research-theme-desc">Methods for modeling and leveraging population heterogeneity in statistical
analyses and for clinical risk prediction. This work focuses on the development of statistical modeling approaches that tailor predictions and analyses 
in the presence of population heterogeneity instead of one-size-fits-all modeling approaches.
intervention effects.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=population-heterogeneity || keywords~=risk-prediction] --sort_by year --order descending %}
</div>
</div>



<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">High-Dimensional &amp; Computational Methods</h2>
<p class="research-theme-desc">Variable selection and dimensionality reduction for complex, high-dimensional
data, and efficient computational algorithms for large-scale statistical
problems. This includes fast penalized regression, structured sparsity
approaches, and optimization algorithms for large datasets.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=high-dimensional || keywords~=penalized-regression || keywords~=variable-selection] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Health Systems Applications</h2>
<p class="research-theme-desc">Applications of statistical methods to improve healthcare delivery and patient
outcomes, including hospital risk prediction, readmission reduction, and
personalized clinical intervention recommendations.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=health-systems] --sort_by year --order descending %}
</div>
</div>
