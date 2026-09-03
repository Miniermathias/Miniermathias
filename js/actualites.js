/* Rendu des actualités — homepage (3 récents) + page actualites.html (liste + article) */
(function () {
  function frDate(iso) {
    try { return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return iso; }
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function card(a) {
    return '<article class="actu-card">' +
      '<time class="actu-date" datetime="' + esc(a.date) + '">' + esc(frDate(a.date)) + '</time>' +
      '<h3 class="actu-title">' + esc(a.titre) + '</h3>' +
      '<p class="actu-excerpt">' + esc(a.extrait) + '</p>' +
      '<a class="actu-link" href="actualites.html?a=' + encodeURIComponent(a.slug) + '">Lire la suite</a>' +
      '</article>';
  }

  fetch('data/actualites.json')
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (list) {
      list = (Array.isArray(list) ? list : []).slice()
        .sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });

      /* Accueil : 3 plus récents, section masquée si aucun article */
      var grid = document.getElementById('actualites-grid');
      if (grid) {
        if (!list.length) { var s = document.getElementById('actualites'); if (s) s.hidden = true; }
        else grid.innerHTML = list.slice(0, 3).map(card).join('');
      }

      /* Page actualités : article seul (?a=slug) ou liste complète */
      var art = document.getElementById('actu-article');
      var listing = document.getElementById('actu-listing');
      var listEl = document.getElementById('actu-list');
      if (listEl) listEl.innerHTML = list.length ? list.map(card).join('') : '<p>Aucune actualité pour le moment.</p>';
      if (art) {
        var slug = new URLSearchParams(location.search).get('a');
        var a = slug ? list.filter(function (x) { return x.slug === slug; })[0] : null;
        if (a) {
          if (listing) listing.hidden = true;
          art.hidden = false;
          document.title = a.titre + ' — HYNERA Environnement';
          art.innerHTML =
            '<a class="actu-back" href="actualites.html">&larr; Toutes les actualités</a>' +
            '<time class="actu-date" datetime="' + esc(a.date) + '">' + esc(frDate(a.date)) + '</time>' +
            '<h1 class="actu-article-title">' + esc(a.titre) + '</h1>' +
            '<div class="actu-body">' + (a.contenu || '<p>' + esc(a.extrait) + '</p>') + '</div>';
        } else {
          art.hidden = true;
        }
      }
    })
    .catch(function () { var s = document.getElementById('actualites'); if (s) s.hidden = true; });
})();
