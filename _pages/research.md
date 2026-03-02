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
observational data. Topics include weighting methods for continuous and
binary treatments, modified treatment policies, energy-based balancing
approaches, and handling violations of positivity and other standard causal
assumptions.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=causal-inference] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Precision Medicine &amp; Individualized Treatment Rules</h2>
<p class="research-theme-desc">Statistical methods for personalizing treatment decisions based on individual
patient characteristics. This includes estimation of optimal individualized
treatment rules, subgroup identification, and methods for complex outcome
types and multi-category treatments.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=precision-medicine] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Population Heterogeneity</h2>
<p class="research-theme-desc">Methods for modeling and leveraging population heterogeneity in statistical
analyses. This includes sufficient dimension reduction for structured
populations, risk modeling across subgroups, and longitudinal heterogeneous
intervention effects.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=treatment-heterogeneity] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Evidence Synthesis &amp; Transportability</h2>
<p class="research-theme-desc">Methods for combining evidence across multiple studies while preserving
causal interpretability. This includes causally interpretable random-effects
meta-analysis, methods combining aggregate and individual participant data,
and transportability of causal effects to target populations.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=meta-analysis] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">Fairness in Statistical Learning</h2>
<p class="research-theme-desc">Methods for assessing and ensuring fairness in predictive statistical models
across intersectional groups and small subpopulations, grounded in
counterfactual causal reasoning.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=fairness] --sort_by year --order descending %}
</div>
</div>

<hr class="research-theme-divider">

<div class="research-theme">
<h2 class="research-theme-title">High-Dimensional &amp; Computational Methods</h2>
<p class="research-theme-desc">Variable selection and dimensionality reduction for complex, high-dimensional
data, and efficient computational algorithms for large-scale statistical
problems. This includes fast penalized regression, structured sparsity
approaches, and optimization algorithms for tall data.</p>
<div class="theme-publications">
{% bibliography --query @*[keywords~=high-dimensional] --sort_by year --order descending %}
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
