---
layout: page
permalink: /cv/
title: CV
---

<div class="cv-actions">
  <div class="cv-buttons">
    <a href="/vita/cv.pdf" class="button" target="_blank">Download CV (PDF)</a>
    <a href="https://scholar.google.com/citations?hl=en&user=2-MWWU4AAAAJ&view_op=list_works&sortby=pubdate" class="button" target="_blank">Google Scholar</a>
  </div>
  {% if site.data.cv_meta.last_updated %}
  <p class="cv-updated">Last updated {{ site.data.cv_meta.last_updated }}</p>
  {% endif %}
</div>

<div class="cv-preview-wrap">
  <a href="/vita/cv.pdf" target="_blank" title="Open full CV (PDF)">
    <img src="/assets/img/cv_preview.png" alt="CV preview" class="cv-preview-img">
  </a>
  <p class="cv-preview-caption">Click image to open full CV (PDF)</p>
</div>
