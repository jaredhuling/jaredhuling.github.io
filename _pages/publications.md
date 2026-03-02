---
layout: page
title: Selected Publications
permalink: /publications/
---

<p class="scholar-link">
  <a href="https://scholar.google.com/citations?hl=en&user=2-MWWU4AAAAJ&view_op=list_works&sortby=pubdate" class="button">Google Scholar</a>
</p>

<div class="pub-section pub-section--preprints">
<h2 class="pub-section-header">Preprints</h2>

{% bibliography --query @unpublished --sort_by year --order descending %}

</div>

<div class="pub-section pub-section--published">
<h2 class="pub-section-header">Publications</h2>

{% bibliography --query @article --sort_by year --order descending %}

</div>
