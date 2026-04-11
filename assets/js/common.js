document.addEventListener('DOMContentLoaded', function () {
  // Abstract toggle
  document.querySelectorAll('a.abstract').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var li = this.closest('li') || this.closest('div');
      if (li) {
        var abstract = li.querySelector('.abstract.hidden');
        if (abstract) abstract.classList.toggle('open');
      }
    });
  });

  // BibTeX toggle
  document.querySelectorAll('a.bibtex').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var li = this.closest('li') || this.closest('div');
      if (li) {
        var bibtex = li.querySelector('.bibtex.hidden');
        if (bibtex) bibtex.classList.toggle('open');
      }
    });
  });

  // Citation panel toggle
  document.querySelectorAll('a.cite-toggle').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var li = this.closest('li') || this.closest('div');
      if (li) {
        var panel = li.querySelector('.cite-panel');
        if (panel) panel.classList.toggle('open');
      }
    });
  });

  // Citation tab switching
  document.querySelectorAll('.cite-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var panel = this.closest('.cite-panel');
      var target = this.getAttribute('data-tab');

      // Update active tab
      panel.querySelectorAll('.cite-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');

      // Show the matching content, hide others
      panel.querySelectorAll('.cite-content').forEach(function (c) {
        c.style.display = c.getAttribute('data-tab') === target ? '' : 'none';
      });

      // Reset copy button text
      var copyBtn = panel.querySelector('.cite-copy');
      if (copyBtn) copyBtn.textContent = 'Copy';
    });
  });

  // Copy citation to clipboard
  document.querySelectorAll('.cite-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = this.closest('.cite-panel');
      // Find the visible cite-content
      var visible = panel.querySelector('.cite-content[style=""], .cite-content:not([style*="display:none"]):not([style*="display: none"])');
      if (!visible) {
        // fallback: find whichever isn't hidden
        panel.querySelectorAll('.cite-content').forEach(function (c) {
          if (c.style.display !== 'none') visible = c;
        });
      }
      if (visible) {
        var text = visible.textContent.trim();
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
        });
      }
    });
  });
});
