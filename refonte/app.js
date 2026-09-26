/* Hynera-Environnement : comportements de la page (aucune dépendance) */
(function () {
  'use strict';

  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/mathiasminier7@gmail.com';
  var THANKS_URL = '../merci.html';
  var PHONE = '02 99 00 62 35';

  /* ---------- En-tête : ombre au défilement ---------- */
  var header = document.getElementById('header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Navigation : section active ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[e.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* ---------- Formulaire ---------- */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var serviceSel = document.getElementById('service');
  var nuisibleField = document.getElementById('nuisible-field');
  var nuisibleSel = document.getElementById('nuisible');
  var frelonHelp = document.getElementById('frelon-help');

  function syncNuisible() {
    var show = serviceSel.value === 'Désinsectisation';
    nuisibleField.hidden = !show;
    if (!show) nuisibleSel.value = '';
    frelonHelp.hidden = !(show && /^Frelons/.test(nuisibleSel.value));
  }
  serviceSel.addEventListener('change', syncNuisible);
  nuisibleSel.addEventListener('change', syncNuisible);
  syncNuisible();

  /* Sélecteur « Quel est votre problème ? » : pré-remplit puis amène au formulaire */
  Array.prototype.forEach.call(document.querySelectorAll('.pick'), function (btn) {
    btn.addEventListener('click', function () {
      serviceSel.value = btn.getAttribute('data-service') || '';
      var n = btn.getAttribute('data-nuisible');
      syncNuisible();
      if (n === 'frelons') {
        nuisibleSel.value = '';
        frelonHelp.hidden = false;
      } else if (n) {
        nuisibleSel.value = n;
      }
      document.getElementById('contact').scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      /* Frelons : on demande de préciser l'espèce, sinon on commence par le nom */
      var target = n === 'frelons' ? nuisibleSel : document.getElementById('nom');
      setTimeout(function () { target.focus({ preventScroll: true }); }, prefersReducedMotion() ? 0 : 450);
    });
  });

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* Compteur de caractères */
  var msg = document.getElementById('message');
  var msgCount = document.querySelector('#message-count span');
  msg.addEventListener('input', function () { msgCount.textContent = msg.value.length; });

  /* Code postal -> communes (API officielle geo.api.gouv.fr) */
  var cp = document.getElementById('code_postal');
  var ville = document.getElementById('ville');
  var communes = document.getElementById('communes');
  var cpTimer, lastCp = '';
  function lookupCommunes() {
    var v = cp.value.trim();
    if (!/^\d{5}$/.test(v) || v === lastCp) return;
    lastCp = v;
    fetch('https://geo.api.gouv.fr/communes?codePostal=' + v + '&fields=nom&format=json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) {
        var names = (Array.isArray(list) ? list : []).map(function (c) { return c.nom; })
          .sort(function (a, b) { return a.localeCompare(b, 'fr'); });
        communes.innerHTML = '';
        names.forEach(function (n) {
          var o = document.createElement('option');
          o.value = n;
          communes.appendChild(o);
        });
        if (names.length === 1 && !ville.value.trim()) {
          ville.value = names[0];
          validateField(ville);
        }
      })
      .catch(function () { /* hors ligne : saisie manuelle */ });
  }
  cp.addEventListener('input', function () {
    cp.value = cp.value.replace(/\D/g, '').slice(0, 5);
    clearTimeout(cpTimer);
    cpTimer = setTimeout(lookupCommunes, 300);
  });

  /* Validation : au blur, puis en direct une fois l'erreur affichée */
  var rules = {
    nom: function (s) { return s.trim().length >= 2 ? '' : 'Indiquez votre nom (2 caractères minimum).'; },
    telephone: function (s) {
      var d = s.replace(/[\s.\-()]/g, '');
      return /^(\+33|0033|0)[1-9]\d{8}$/.test(d) ? '' : 'Indiquez un numéro valide, par exemple 06 12 34 56 78.';
    },
    email: function (s) { return s === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim()) ? '' : 'Cette adresse e-mail semble incomplète.'; },
    adresse: function (s) { return s.trim().length >= 5 ? '' : 'Indiquez l\'adresse d\'intervention (numéro et rue).'; },
    code_postal: function (s) { return /^\d{5}$/.test(s.trim()) ? '' : 'Indiquez un code postal à 5 chiffres.'; },
    ville: function (s) { return s.trim().length >= 2 ? '' : 'Indiquez la ville d\'intervention.'; }
  };

  function validateField(input) {
    var rule = rules[input.name];
    if (!rule) return true;
    var error = rule(input.value);
    var field = input.closest('.field');
    var errEl = document.getElementById(input.id + '-err');
    field.classList.toggle('has-error', !!error);
    input.setAttribute('aria-invalid', error ? 'true' : 'false');
    if (errEl) errEl.textContent = error;
    return !error;
  }

  Object.keys(rules).forEach(function (name) {
    var input = form.elements[name];
    input.addEventListener('blur', function () { if (input.value !== '' || input.required) validateField(input); });
    input.addEventListener('input', function () { if (input.closest('.field').classList.contains('has-error')) validateField(input); });
  });

  var consent = document.getElementById('rgpd');
  var consentErr = document.getElementById('rgpd-err');
  function validateConsent() {
    var ok = consent.checked;
    consentErr.textContent = ok ? '' : 'Cochez cette case pour que l\'on puisse traiter votre demande.';
    consent.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  }
  consent.addEventListener('change', validateConsent);

  /* Envoi */
  var submit = document.getElementById('submit');
  var submitLabel = submit.querySelector('.btn-label');
  var feedback = document.getElementById('form-feedback');

  function showError(text) {
    feedback.innerHTML = '';
    feedback.appendChild(document.createTextNode(text + ' Vous pouvez aussi nous appeler au '));
    var a = document.createElement('a');
    a.href = 'tel:+33299006235';
    a.textContent = PHONE;
    feedback.appendChild(a);
    feedback.appendChild(document.createTextNode('.'));
    feedback.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    feedback.hidden = true;

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (!validateConsent() && !firstInvalid) firstInvalid = consent;
    if (firstInvalid) { firstInvalid.focus(); return; }

    submit.classList.add('is-loading');
    submit.disabled = true;
    submitLabel.textContent = 'Envoi en cours…';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (res) {
        return res.json().catch(function () { return null; }).then(function (json) {
          /* FormSubmit peut répondre 200 avec success:"false" : ce n'est pas un envoi réussi */
          return res.ok && !(json && String(json.success) === 'false');
        });
      })
      .then(function (sent) {
        if (!sent) throw new Error('refused');
        var url = THANKS_URL;
        if (nuisibleSel.value === 'Frelons asiatiques') {
          url += '?n=frelon' + (ville.value.trim() ? '&v=' + encodeURIComponent(ville.value.trim()) : '');
        }
        window.location.href = url;
      })
      .catch(function (err) {
        submit.classList.remove('is-loading');
        submit.disabled = false;
        submitLabel.textContent = 'Envoyer ma demande';
        showError(err && err.message === 'refused'
          ? 'L\'envoi n\'a pas abouti.'
          : 'L\'envoi n\'a pas abouti. Vérifiez votre connexion et réessayez.');
      });
  });

  /* Année courante */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
