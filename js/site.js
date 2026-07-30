/* Global script loaded on every page (classic, deferred).
   Handles: navbar scrolled state, mobile menu, dropdown,
   smooth scroll, dynamic year, cookie consent, sticky call. */
(function () {
  'use strict';

  /* ---- Dynamic copyright year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar scrolled state ---- */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var ticking = false;
    var onScroll = function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          navbar.classList.toggle('scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  /* ---- Mobile menu ---- */
  var hamburger = document.getElementById('hamburger');
  var menu      = document.getElementById('mobileMenu');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    hamburger && hamburger.classList.remove('active');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  if (hamburger && menu) {
    hamburger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      hamburger.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- Services dropdown (touch / keyboard) ---- */
  var dd = document.querySelector('.nav-dropdown');
  if (dd) {
    var toggle = dd.querySelector('.nav-dropdown-toggle');
    if (toggle && window.matchMedia('(pointer: coarse)').matches) {
      toggle.addEventListener('click', function (e) {
        if (!dd.classList.contains('open')) {
          e.preventDefault();
          dd.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
      document.addEventListener('click', function (e) {
        if (!dd.contains(e.target)) { dd.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
      });
    } else if (toggle) {
      /* Desktop: le menu s'ouvre au survol/focus via CSS — on garde aria-expanded synchronisé */
      var syncAria = function (open) { toggle.setAttribute('aria-expanded', String(open)); };
      dd.addEventListener('mouseenter', function () { syncAria(true); });
      dd.addEventListener('mouseleave', function () { syncAria(false); });
      dd.addEventListener('focusin',  function () { syncAria(true); });
      dd.addEventListener('focusout', function (e) { if (!dd.contains(e.relatedTarget)) syncAria(false); });
    }
  }

  /* ---- Smooth scroll for in-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      var t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      var offset = (navbar ? navbar.offsetHeight : 0) + 8;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ---- FAQ accordions ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---- Cookie consent (CNIL friendly) ---- */
  var banner = document.getElementById('cookie-banner');
  if (banner) {
    var stored = null;
    try { stored = localStorage.getItem('hynera-cookie-consent'); } catch (e) {}
    if (!stored) {
      banner.hidden = false;
    }
    function setConsent(value) {
      try { localStorage.setItem('hynera-cookie-consent', value); } catch (e) {}
      banner.hidden = true;
    }
    var accept = document.getElementById('cookie-accept');
    var refuse = document.getElementById('cookie-refuse');
    accept && accept.addEventListener('click', function () { setConsent('accepted'); });
    refuse && refuse.addEventListener('click', function () { setConsent('refused'); });
  }
})();
