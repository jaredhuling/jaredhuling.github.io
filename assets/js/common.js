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
});
