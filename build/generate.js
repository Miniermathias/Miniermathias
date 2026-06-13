/* Static page generator for HYNERA Environnement.
   Produces service pages, local SEO pages, legal page, sitemap and robots.
   Run: node build/generate.js  */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.hynera.fr';
const PHONE = '02 99 00 62 35';
const TEL = '0299006235';

/* ---------- Shared markup ---------- */

function head(o) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${o.description}">
  <link rel="canonical" href="${SITE}/${o.slug}">
  <meta property="og:title" content="${o.ogTitle}">
  <meta property="og:description" content="${o.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE}/${o.slug}">
  <meta property="og:image" content="${SITE}/assets/og-hynera.svg">
  <meta property="og:locale" content="fr_FR">
  <title>${o.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/animations.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="css/footer.css">
  <link rel="stylesheet" href="css/extra.css">
  <link rel="stylesheet" href="css/polish.css">
${o.jsonld || ''}
</head>
<body>
<a href="#main" class="skip-link">Aller au contenu</a>`;
}

const NAV = `
<nav id="navbar" aria-label="Navigation principale">
  <a href="tel:${TEL}" class="emergency-banner" aria-label="Astreinte frelons et guêpes, appelez le ${PHONE}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <span><strong>Astreinte frelons et guêpes</strong> les week-ends de juin à décembre. Appelez le ${PHONE}.</span>
  </a>
  <div class="nav-top">
    <div class="container nav-top-inner">
      <a href="index.html" class="nav-logo" aria-label="HYNERA Environnement — accueil">
        <img src="assets/logo-hynera.svg" class="nav-logo-img" width="42" height="42" alt="" aria-hidden="true">
        <div class="nav-logo-text">
          <span class="nav-logo-name">HYNERA<span> Environnement</span></span>
          <span class="nav-logo-sub">Lutte contre les nuisibles</span>
        </div>
      </a>
      <div class="nav-links" role="list">
        <a href="index.html" class="nav-link" role="listitem">Accueil</a>
        <div class="nav-dropdown" role="listitem">
          <a href="index.html#services" class="nav-link nav-dropdown-toggle" aria-haspopup="true" aria-expanded="false">Services
            <svg class="nav-caret" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></a>
          <div class="nav-dropdown-menu" role="menu">
            <a href="traitement-bois.html" role="menuitem">Traitement du bois</a>
            <a href="desinsectisation.html" role="menuitem">Désinsectisation</a>
            <a href="deratisation.html" role="menuitem">Dératisation</a>
            <a href="depigeonnage.html" role="menuitem">Dépigeonnage</a>
            <a href="desinfection.html" role="menuitem">Désinfection</a>
            <a href="facade-toiture.html" role="menuitem">Façade et toiture</a>
          </div>
        </div>
        <a href="index.html#about" class="nav-link" role="listitem">À propos</a>
        <a href="index.html#agencies" class="nav-link" role="listitem">Agences</a>
        <a href="index.html#reviews" class="nav-link" role="listitem">Avis</a>
        <a href="index.html#contact" class="nav-link" role="listitem">Contact</a>
      </div>
      <div class="nav-cta">
        <a href="tel:${TEL}" class="nav-phone"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127 1 .36 1.99.7 2.93a2 2 0 01-.45 2.11L6.91 8.09A16 16 0 0015.91 17l.27-.27a2 2 0 012.11-.45c.94.34 1.93.57 2.93.7A2 2 0 0122 19z"/></svg>${PHONE}</a>
        <a href="index.html#contact" class="btn btn-primary nav-devis">Devis gratuit</a>
        <button class="hamburger" id="hamburger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </div>
  <div class="nav-services" role="navigation" aria-label="Services">
    <div class="container nav-services-inner">
      <a href="traitement-bois.html" class="nav-service-link">Traitement du bois</a>
      <a href="desinsectisation.html" class="nav-service-link">Désinsectisation</a>
      <a href="deratisation.html" class="nav-service-link">Dératisation</a>
      <a href="depigeonnage.html" class="nav-service-link">Dépigeonnage</a>
      <a href="desinfection.html" class="nav-service-link">Désinfection</a>
      <a href="facade-toiture.html" class="nav-service-link">Façade et toiture</a>
      <div class="nav-social">
        <a href="https://facebook.com/HyneraBretagne" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
        <a href="https://instagram.com/hyneraenvironnement" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="https://www.tiktok.com/@hyneraenvironnement" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 000 12.68 6.34 6.34 0 006.33-6.34V8.94a8.16 8.16 0 004.77 1.53V7.02a4.85 4.85 0 01-1-.33z"/></svg></a>
      </div>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu" role="dialog" aria-label="Menu navigation" aria-hidden="true">
  <a href="index.html" class="mobile-link">Accueil</a>
  <a href="traitement-bois.html" class="mobile-link mobile-sub">Traitement du bois</a>
  <a href="desinsectisation.html" class="mobile-link mobile-sub">Désinsectisation</a>
  <a href="deratisation.html" class="mobile-link mobile-sub">Dératisation</a>
  <a href="depigeonnage.html" class="mobile-link mobile-sub">Dépigeonnage</a>
  <a href="desinfection.html" class="mobile-link mobile-sub">Désinfection</a>
  <a href="facade-toiture.html" class="mobile-link mobile-sub">Façade et toiture</a>
  <a href="index.html#about" class="mobile-link">À propos</a>
  <a href="index.html#agencies" class="mobile-link">Agences</a>
  <a href="index.html#reviews" class="mobile-link">Avis</a>
  <a href="index.html#contact" class="mobile-link">Contact</a>
  <a href="tel:${TEL}" class="mobile-link mobile-phone"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127 1 .36 1.99.7 2.93a2 2 0 01-.45 2.11L6.91 8.09A16 16 0 0015.91 17l.27-.27a2 2 0 012.11-.45c.94.34 1.93.57 2.93.7A2 2 0 0122 19z"/></svg>${PHONE}</a>
</div>`;

const FOOTER = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">HYNERA<span> Environnement</span></div>
        <p>Depuis 2003, on protège les particuliers et les professionnels de Bretagne contre les nuisibles.</p>
        <div class="footer-social">
          <a href="https://facebook.com/HyneraBretagne" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a href="https://instagram.com/hyneraenvironnement" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="https://www.tiktok.com/@hyneraenvironnement" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.77.5 2.89 2.89 0 012.89-3.39c.28 0 .54.04.79.1V9.01a6.34 6.34 0 105.56 6.29V8.94a8.16 8.16 0 004.77 1.53V7.02a4.85 4.85 0 01-1-.33z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="traitement-bois.html">Traitement du bois</a></li>
          <li><a href="desinsectisation.html">Désinsectisation</a></li>
          <li><a href="deratisation.html">Dératisation</a></li>
          <li><a href="depigeonnage.html">Dépigeonnage</a></li>
          <li><a href="desinfection.html">Désinfection</a></li>
          <li><a href="facade-toiture.html">Façade et toiture</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Nos zones</h4>
        <ul>
          <li><a href="deratisation-rennes.html">Dératisation Rennes</a></li>
          <li><a href="deratisation-saint-malo.html">Dératisation Saint-Malo</a></li>
          <li><a href="desinsectisation-rennes.html">Désinsectisation Rennes</a></li>
          <li><a href="nuisibles-vannes.html">Nuisibles Vannes</a></li>
          <li><a href="traitement-bois-bretagne.html">Traitement bois Bretagne</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Informations</h4>
        <ul>
          <li><a href="index.html#contact">Demander un devis</a></li>
          <li><a href="index.html#reviews">Avis clients</a></li>
          <li><a href="mentions-legales.html">Mentions légales</a></li>
          <li><a href="mentions-legales.html#rgpd">Politique RGPD</a></li>
        </ul>
        <div class="footer-cert">
          <span>✓ Certifié CTBA+</span>
          <span>✓ Agréé Certibiocide</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="year">2026</span> HYNERA Environnement, SARL Unipersonnelle, 35170 Bruz</p>
      <a href="#main" class="back-top" aria-label="Retour en haut"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg></a>
    </div>
  </div>
</footer>
<a href="tel:${TEL}" class="sticky-call" aria-label="Appeler HYNERA au ${PHONE}">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127 1 .36 1.99.7 2.93a2 2 0 01-.45 2.11L6.91 8.09A16 16 0 0015.91 17l.27-.27a2 2 0 012.11-.45c.94.34 1.93.57 2.93.7A2 2 0 0122 19z"/></svg>
  Appeler le ${PHONE}
</a>
<div class="cookie-banner" id="cookie-banner" role="dialog" aria-live="polite" aria-label="Consentement cookies" hidden>
  <p class="cookie-text">On utilise des cookies pour mesurer l'audience du site et améliorer votre navigation. Vous pouvez accepter ou refuser, votre choix est conservé.</p>
  <div class="cookie-actions">
    <button class="cookie-btn cookie-accept" id="cookie-accept">Accepter</button>
    <button class="cookie-btn cookie-refuse" id="cookie-refuse">Refuser</button>
  </div>
</div>
<script src="js/site.js" defer></script>
</body>
</html>`;

const ALL_SERVICES = [
  ['traitement-bois', 'Traitement du bois'],
  ['desinsectisation', 'Désinsectisation'],
  ['deratisation', 'Dératisation'],
  ['depigeonnage', 'Dépigeonnage'],
  ['desinfection', 'Désinfection'],
  ['facade-toiture', 'Façade et toiture'],
];

function otherServices(currentSlug) {
  const items = ALL_SERVICES.filter(s => s[0] !== currentSlug)
    .map(s => `<a class="other-service" href="${s[0]}.html"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>${s[1]}</a>`)
    .join('\n          ');
  return `<div class="other-services">
        <h2>Nos autres services</h2>
        <div class="other-services-grid">
          ${items}
        </div>
      </div>`;
}

function faqBlock(faq) {
  return faq.map(f => `<div class="faq-item">
          <button class="faq-q" aria-expanded="false">${f.q}<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
          <div class="faq-a"><p>${f.a}</p></div>
        </div>`).join('\n        ');
}

function faqJsonLd(faq) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }, null, 2);
}

function serviceJsonLd(name, description) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    areaServed: 'Bretagne',
    provider: {
      '@type': 'LocalBusiness',
      '@id': SITE + '/#business',
      name: 'HYNERA Environnement',
      telephone: TEL,
      url: SITE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3 Impasse Pierre-Gilles De Gennes',
        addressLocality: 'Bruz',
        postalCode: '35170',
        addressCountry: 'FR',
      },
    },
  }, null, 2);
}

function buildPage(cfg) {
  const jsonld = `  <script type="application/ld+json">\n${serviceJsonLd(cfg.serviceName, cfg.serviceDescription)}\n  </script>\n  <script type="application/ld+json">\n${faqJsonLd(cfg.faq)}\n  </script>`;
  const crumbCat = cfg.crumbCat || 'Services';
  const photoPlaceholder = `<figure class="page-photo" aria-label="Photo de l'intervention ${cfg.crumb}">
        <div class="page-photo-placeholder">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          <span>Photo à intégrer — ${cfg.crumb}</span>
        </div>
      </figure>`;

  const contentHtml = cfg.sections.map((s, i) => {
    let html = `<h2>${s.h2}</h2>\n        ` + s.paragraphs.map(p => `<p>${p}</p>`).join('\n        ');
    if (s.list) html += `\n        <ul>\n          ` + s.list.map(li => `<li>${li}</li>`).join('\n          ') + `\n        </ul>`;
    if (i === 0) html += `\n        ${photoPlaceholder}`;
    return html;
  }).join('\n        ');

  return head({
    slug: cfg.slug,
    title: cfg.metaTitle,
    ogTitle: cfg.ogTitle,
    description: cfg.metaDescription,
    jsonld: jsonld,
  }) + NAV + `
<main id="main" class="page-body">
  <nav class="breadcrumb" aria-label="Fil d'Ariane">
    <div class="container breadcrumb-inner">
      <a href="index.html" class="breadcrumb-home">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Accueil
      </a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <a href="index.html#services">${crumbCat}</a>
      <span class="breadcrumb-sep" aria-hidden="true">›</span>
      <span class="breadcrumb-current" aria-current="page">${cfg.crumb}</span>
    </div>
  </nav>

  <section class="page-hero">
    <div class="container">
      <span class="overline">${cfg.eyebrow}</span>
      <h1>${cfg.h1}</h1>
      <p>${cfg.intro}</p>
      <div class="page-hero-actions">
        <a href="tel:${TEL}" class="btn btn-primary"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127 1 .36 1.99.7 2.93a2 2 0 01-.45 2.11L6.91 8.09A16 16 0 0015.91 17l.27-.27a2 2 0 012.11-.45c.94.34 1.93.57 2.93.7A2 2 0 0122 19z" fill="currentColor"/></svg>Appeler le ${PHONE}</a>
        <a href="index.html#contact" class="btn btn-outline">Demander un devis</a>
      </div>
    </div>
  </section>

  <section class="page-section">
    <div class="container page-layout">
      <div class="page-content">
        ${contentHtml}

        <h2>Questions fréquentes</h2>
        <div class="faq">
        ${faqBlock(cfg.faq)}
        </div>

        ${otherServices(cfg.slug)}
      </div>

      <aside class="page-sidebar">
        <div class="sidebar-card">
          <h3>Besoin d'une intervention ?</h3>
          <p>On vous répond sous 24 à 48h et on intervient chez vous rapidement.</p>
          <a href="index.html#contact" class="btn btn-primary">Devis gratuit</a>
          <a href="tel:${TEL}" class="sidebar-phone"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127 1 .36 1.99.7 2.93a2 2 0 01-.45 2.11L6.91 8.09A16 16 0 0015.91 17l.27-.27a2 2 0 012.11-.45c.94.34 1.93.57 2.93.7A2 2 0 0122 19z"/></svg>${PHONE}</a>
        </div>
        <div class="sidebar-links">
          <h3>Nos zones d'intervention</h3>
          <ul>
            <li><a href="deratisation-rennes.html">Dératisation à Rennes</a></li>
            <li><a href="deratisation-saint-malo.html">Dératisation à Saint-Malo</a></li>
            <li><a href="desinsectisation-rennes.html">Désinsectisation à Rennes</a></li>
            <li><a href="nuisibles-vannes.html">Nuisibles à Vannes</a></li>
            <li><a href="traitement-bois-bretagne.html">Traitement bois en Bretagne</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>

  <section class="page-section" style="padding-top:0">
    <div class="container">
      <div class="cta-band">
        <h2>Un nuisible chez vous ? On s'en occupe.</h2>
        <p>Devis gratuit, intervention sous 24 à 48h, garantie de résultat.</p>
        <a href="tel:${TEL}" class="btn">Appeler le ${PHONE}</a>
      </div>
    </div>
  </section>
</main>` + FOOTER;
}

/* ---------- Service pages content ---------- */

const services = [
  {
    slug: 'traitement-bois',
    crumb: 'Traitement du bois',
    eyebrow: 'Traitement du bois',
    h1: 'Traitement du bois à Rennes et en Bretagne',
    metaTitle: 'Traitement du bois à Rennes et en Bretagne | HYNERA',
    ogTitle: 'Traitement du bois à Rennes et en Bretagne',
    metaDescription: 'Traitement du bois et des charpentes à Rennes et en Bretagne. On traite termites, capricornes et vrillettes, et on protège vos structures. Devis gratuit.',
    serviceName: 'Traitement du bois',
    serviceDescription: 'Traitement curatif et préventif des bois et charpentes contre les insectes xylophages et les champignons.',
    intro: 'Les insectes du bois fragilisent vos charpentes en silence. On repère les attaques, on traite le bois en profondeur et on le protège pour les années à venir.',
    sections: [
      { h2: 'Pourquoi traiter le bois de votre maison', paragraphs: [
        'Une charpente attaquée perd de sa résistance sans que rien ne se voie de l\'extérieur. Les capricornes, vrillettes et termites creusent des galeries à l\'intérieur des poutres, jusqu\'à compromettre la solidité de la structure.',
        'On intervient chez vous pour diagnostiquer l\'attaque, identifier l\'insecte responsable et appliquer le bon traitement. Plus on agit tôt, moins les dégâts sont coûteux à réparer.' ] },
      { h2: 'Les insectes que l\'on traite', paragraphs: [
        'Chaque insecte demande une méthode adaptée. Voici ceux que l\'on rencontre le plus souvent dans la région :' ],
        list: [
          'Capricornes des maisons : ils s\'attaquent aux bois résineux des charpentes.',
          'Vrillettes : petites mais nombreuses, elles touchent meubles et boiseries.',
          'Termites : ils progressent en colonie et nécessitent un traitement complet.',
          'Lyctus : ils visent surtout les bois feuillus et le parquet.' ] },
      { h2: 'Comment se déroule une intervention', paragraphs: [
        'On commence par un état des lieux du bois, poutre par poutre. On sonde, on repère les zones touchées et on évalue l\'étendue de l\'attaque.',
        'Vient ensuite le bûchage des parties abîmées, puis l\'injection et la pulvérisation d\'un produit curatif qui pénètre le bois. On termine par un traitement de surface qui protège l\'ensemble contre de nouvelles attaques.',
        'On vous explique chaque étape et on vous remet un compte rendu clair de ce qui a été fait.' ] },
      { h2: 'Traitement préventif et garantie', paragraphs: [
        'Si votre charpente est saine, un traitement préventif évite les mauvaises surprises. C\'est aussi un atout au moment de vendre, car l\'état parasitaire du bois est demandé lors d\'une vente.',
        'Toutes nos interventions de traitement du bois sont garanties. Si le problème persiste, on revient sans frais supplémentaire.' ] },
    ],
    faq: [
      { q: 'Combien de temps dure un traitement du bois ?', a: 'Pour une maison individuelle, on traite en général une charpente en une journée. La durée dépend de la surface de bois et de l\'étendue de l\'attaque.' },
      { q: 'Le traitement est-il dangereux pour ma famille ?', a: 'On utilise des produits certifiés et on vous indique le délai à respecter avant de réoccuper les combles. En usage courant, il n\'y a pas de risque une fois le produit sec.' },
      { q: 'Comment savoir si ma charpente est attaquée ?', a: 'Les signes courants sont la sciure fine sous les poutres, des petits trous ronds, un bois qui sonne creux. Au moindre doute, on se déplace pour un diagnostic.' },
      { q: 'Faites-vous un traitement préventif sur du bois neuf ?', a: 'Oui. On applique un produit préventif sur les charpentes saines pour éviter toute attaque future, notamment avant la pose ou lors d\'une rénovation.' },
    ],
  },
  {
    slug: 'desinsectisation',
    crumb: 'Désinsectisation',
    eyebrow: 'Désinsectisation',
    h1: 'Désinsectisation à Rennes et en Bretagne',
    metaTitle: 'Désinsectisation à Rennes et en Bretagne | HYNERA',
    ogTitle: 'Désinsectisation à Rennes et en Bretagne',
    metaDescription: 'Désinsectisation à Rennes et en Bretagne : cafards, punaises de lit, fourmis, guêpes et frelons. On intervient chez vous sous 48h. Devis gratuit.',
    serviceName: 'Désinsectisation',
    serviceDescription: 'Traitement des insectes nuisibles dans les habitations et les locaux professionnels.',
    intro: 'Cafards dans la cuisine, punaises dans la chambre, fourmis qui reviennent sans arrêt : on traite tout type d\'insecte et on intervient chez vous sous 48h.',
    sections: [
      { h2: 'Une réponse pour chaque insecte', paragraphs: [
        'Les insectes nuisibles ne se traitent pas tous de la même façon. Un nid de guêpes ne demande pas la même approche qu\'une infestation de punaises de lit.',
        'On identifie l\'insecte, on cherche la source du problème et on choisit la méthode la plus efficace : pulvérisation, gel, pièges ou traitement par la chaleur selon les cas.' ] },
      { h2: 'Les insectes que l\'on traite', paragraphs: [
        'On intervient régulièrement contre :' ],
        list: [
          'Blattes et cafards, dans les cuisines et les vide-ordures.',
          'Punaises de lit, avec un protocole complet pour ne rien laisser passer.',
          'Fourmis, en traitant les colonies à la source.',
          'Guêpes et frelons, y compris les frelons asiatiques en hauteur.',
          'Moustiques, mouches et chenilles processionnaires.' ] },
      { h2: 'Le cas des punaises de lit', paragraphs: [
        'Les punaises de lit se propagent vite et résistent aux traitements grand public. On inspecte les matelas, sommiers, plinthes et prises, puis on traite chaque foyer.',
        'Un deuxième passage est souvent prévu pour traiter les œufs éclos après la première intervention. C\'est ce suivi qui fait la différence.' ] },
      { h2: 'Intervention rapide et discrète', paragraphs: [
        'On sait qu\'un problème d\'insectes, ça presse. On intervient sous 48h, et on adapte nos horaires pour les commerces et les professionnels qui ne veulent pas perturber leur activité.',
        'Nos techniciens arrivent en véhicule banalisé si vous le souhaitez, et on vous donne les conseils pour éviter que le problème revienne.' ] },
    ],
    faq: [
      { q: 'Sous combien de temps intervenez-vous ?', a: 'On intervient sous 48h maximum pour la désinsectisation, et plus vite en cas d\'urgence comme un nid de guêpes ou de frelons.' },
      { q: 'Faut-il quitter le logement pendant le traitement ?', a: 'Pour la plupart des insectes, non. Pour les punaises de lit ou un traitement par fumigation, on vous indique le temps d\'attente avant de réoccuper les pièces.' },
      { q: 'Combien de passages pour les punaises de lit ?', a: 'En général deux passages espacés de quelques semaines, le temps de traiter les œufs qui éclosent après la première intervention.' },
      { q: 'Intervenez-vous pour les professionnels ?', a: 'Oui, on travaille pour les restaurants, hôtels, commerces et collectivités, avec des créneaux adaptés à votre activité.' },
    ],
  },
  {
    slug: 'deratisation',
    crumb: 'Dératisation',
    eyebrow: 'Dératisation',
    h1: 'Dératisation à Rennes et en Bretagne',
    metaTitle: 'Dératisation à Rennes et en Bretagne | HYNERA',
    ogTitle: 'Dératisation à Rennes et en Bretagne',
    metaDescription: 'Dératisation à Rennes et en Bretagne : rats, souris, campagnols. On pose les pièges, on traite et on assure le suivi. Devis gratuit, garantie résultat.',
    serviceName: 'Dératisation',
    serviceDescription: 'Traitement des rongeurs dans les habitations, locaux professionnels et espaces extérieurs.',
    intro: 'Un rongeur dans la maison ou l\'entreprise, c\'est un risque pour la santé et pour vos installations. On pose les pièges, on traite et on suit le site jusqu\'au traitement complet.',
    sections: [
      { h2: 'Pourquoi agir vite contre les rongeurs', paragraphs: [
        'Les rats et les souris rongent les câbles, contaminent les denrées et se reproduisent très vite. Quelques individus deviennent une colonie en quelques semaines.',
        'On intervient chez vous pour stopper l\'infestation, mais aussi pour trouver par où ils entrent et boucher les accès.' ] },
      { h2: 'Les rongeurs que l\'on traite', paragraphs: [
        'On régule tous les rongeurs présents dans la région :' ],
        list: [
          'Rats noirs et surmulots, dans les caves, greniers et réseaux.',
          'Souris, qui se faufilent dans les moindres recoins.',
          'Campagnols et mulots, dans les jardins et terrains.',
          'Ragondins, le long des cours d\'eau et plans d\'eau.' ] },
      { h2: 'Notre méthode, du diagnostic au suivi', paragraphs: [
        'On commence par repérer les zones de passage, les nids et les points d\'entrée. On installe ensuite des postes d\'appâtage sécurisés, hors de portée des enfants et des animaux domestiques.',
        'On revient contrôler les postes, on ajuste si besoin et on vérifie que l\'activité a bien cessé. Pour les professionnels, on tient un plan de lutte et un registre conforme aux contrôles d\'hygiène.' ] },
      { h2: 'Prévention et garantie', paragraphs: [
        'Traiter les rongeurs ne suffit pas si rien ne change. On vous conseille sur les accès à condamner et les sources de nourriture à supprimer.',
        'Nos interventions sont garanties. Si l\'activité reprend, on revient pour régler le problème.' ] },
    ],
    faq: [
      { q: 'Les appâts sont-ils dangereux pour mon chien ?', a: 'On utilise des postes d\'appâtage sécurisés et fermés à clé, conçus pour rester hors de portée des animaux domestiques et des enfants.' },
      { q: 'Combien de temps pour se débarrasser des rats ?', a: 'On constate en général une nette baisse d\'activité en une à deux semaines. Le suivi confirme que l\'activité a bien cessé.' },
      { q: 'Comment les rongeurs entrent-ils chez moi ?', a: 'Par les canalisations, les fissures, les bouches d\'aération ou sous les portes. On repère les accès et on vous indique comment les boucher.' },
      { q: 'Proposez-vous des contrats pour les professionnels ?', a: 'Oui, avec un plan de lutte, des passages réguliers et un registre conforme aux normes d\'hygiène HACCP.' },
    ],
  },
  {
    slug: 'depigeonnage',
    crumb: 'Dépigeonnage',
    eyebrow: 'Dépigeonnage',
    h1: 'Dépigeonnage à Rennes et en Bretagne',
    metaTitle: 'Dépigeonnage à Rennes et en Bretagne | HYNERA',
    ogTitle: 'Dépigeonnage à Rennes et en Bretagne',
    metaDescription: 'Dépigeonnage à Rennes et en Bretagne : pose de filets, pics anti-pigeons et nettoyage. On protège vos façades et toitures durablement. Devis gratuit.',
    serviceName: 'Dépigeonnage',
    serviceDescription: 'Protection des bâtiments contre les pigeons par dispositifs d\'éloignement et nettoyage.',
    intro: 'Les pigeons salissent les façades et leurs fientes abîment les bâtiments. On installe des dispositifs durables pour les éloigner et on nettoie les zones touchées.',
    sections: [
      { h2: 'Les dégâts causés par les pigeons', paragraphs: [
        'Les fientes de pigeons sont acides : elles attaquent la pierre, le métal et les peintures. Elles bouchent aussi les gouttières et créent un risque sanitaire dans les lieux de passage.',
        'On intervient sur les bâtiments d\'habitation comme sur les locaux professionnels pour stopper le problème et protéger durablement les structures.' ] },
      { h2: 'Les solutions que l\'on installe', paragraphs: [
        'Selon la configuration du bâtiment, on choisit le dispositif le plus discret et le plus efficace :' ],
        list: [
          'Filets de protection pour fermer les recoins et les cours intérieures.',
          'Pics anti-pigeons sur les rebords, corniches et enseignes.',
          'Systèmes de câbles tendus sur les zones sensibles.',
          'Répulsifs adaptés aux toitures et aux charpentes métalliques.' ] },
      { h2: 'Nettoyage et désinfection', paragraphs: [
        'Avant de poser un dispositif, on retire les nids et on nettoie les fientes. On désinfecte ensuite les surfaces pour neutraliser les germes et les parasites laissés par les oiseaux.',
        'Cette étape est importante : elle assainit les lieux et garantit que les protections tiennent dans le temps.' ] },
      { h2: 'Une protection qui dure', paragraphs: [
        'Nos dispositifs sont pensés pour résister aux intempéries bretonnes et rester efficaces des années. On privilégie des solutions qui respectent les oiseaux : on les éloigne sans les blesser.',
        'On vous remet un devis clair après une visite sur place, car chaque bâtiment est différent.' ] },
    ],
    faq: [
      { q: 'Les dispositifs anti-pigeons sont-ils visibles ?', a: 'On choisit les solutions les plus discrètes selon le bâtiment. Les filets et câbles se fondent dans l\'architecture et restent peu visibles depuis la rue.' },
      { q: 'Est-ce que ça blesse les pigeons ?', a: 'Non. Nos dispositifs éloignent les oiseaux sans les blesser. L\'objectif est de les empêcher de se poser, pas de leur faire du mal.' },
      { q: 'Faut-il un échafaudage ?', a: 'Pas toujours. On travaille souvent à la nacelle ou en hauteur sécurisée. On évalue l\'accès lors de la visite et on adapte le matériel.' },
      { q: 'Combien de temps dure la protection ?', a: 'Avec un entretien minimal, nos dispositifs restent efficaces plusieurs années. On peut prévoir une visite de contrôle si vous le souhaitez.' },
    ],
  },
  {
    slug: 'desinfection',
    crumb: 'Désinfection',
    eyebrow: 'Désinfection',
    h1: 'Désinfection à Rennes et en Bretagne',
    metaTitle: 'Désinfection à Rennes et en Bretagne | HYNERA',
    ogTitle: 'Désinfection à Rennes et en Bretagne',
    metaDescription: 'Désinfection de locaux et habitations à Rennes et en Bretagne. Thermonébulisation, nébulisation et pulvérisation contre virus, microbes et bactéries.',
    serviceName: 'Désinfection',
    serviceDescription: 'Assainissement des locaux et habitations contre les virus, microbes et bactéries.',
    intro: 'Après un dégât, une infestation ou pour un local sensible, on assainit vos espaces en profondeur contre les virus, microbes et bactéries.',
    sections: [
      { h2: 'Quand faire appel à une désinfection', paragraphs: [
        'Certaines situations demandent plus qu\'un nettoyage classique : un logement insalubre, un local après le passage de nuisibles, une cuisine professionnelle ou un cabinet médical.',
        'On intervient chez vous ou dans vos locaux pour neutraliser les germes invisibles qui posent un risque pour la santé.' ] },
      { h2: 'Nos techniques de désinfection', paragraphs: [
        'On adapte la méthode à la surface et au type de local :' ],
        list: [
          'Thermonébulisation, qui diffuse un produit en fines particules dans tout le volume.',
          'Nébulisation à froid, pour traiter les surfaces et l\'air ambiant.',
          'Pulvérisation ciblée sur les zones sensibles et les points de contact.' ] },
      { h2: 'Des locaux assainis en profondeur', paragraphs: [
        'Ces techniques atteignent les recoins difficiles d\'accès, là où un nettoyage manuel ne va pas. Le produit se dépose sur toutes les surfaces et neutralise les agents pathogènes.',
        'On vous indique le temps d\'aération nécessaire avant de réoccuper les lieux, pour que tout se fasse en toute sécurité.' ] },
      { h2: 'Pour les particuliers et les professionnels', paragraphs: [
        'On travaille pour les habitations comme pour les restaurants, les commerces, les cabinets et les collectivités. On adapte nos horaires pour limiter l\'impact sur votre activité.',
        'On utilise des produits homologués et on respecte les protocoles d\'hygiène en vigueur.',
        'Après chaque intervention, on vous remet un compte rendu de ce qui a été traité. Pour les professionnels soumis à des contrôles, ce document fait partie de votre dossier d\'hygiène et prouve le sérieux de votre démarche.' ] },
    ],
    faq: [
      { q: 'Quelle est la différence avec un nettoyage classique ?', a: 'Le nettoyage enlève la saleté visible. La désinfection neutralise les germes, virus et bactéries, y compris dans les zones difficiles d\'accès.' },
      { q: 'Combien de temps avant de réoccuper les lieux ?', a: 'Cela dépend de la technique et du produit. On vous indique précisément le temps d\'aération à respecter, en général de quelques heures.' },
      { q: 'Les produits sont-ils dangereux ?', a: 'On utilise des produits homologués et appliqués par des techniciens formés. En respectant le temps d\'aération, il n\'y a pas de risque.' },
      { q: 'Intervenez-vous en urgence ?', a: 'Oui, pour les situations sensibles on s\'organise rapidement. Appelez-nous pour planifier une intervention au plus vite.' },
    ],
  },
  {
    slug: 'facade-toiture',
    crumb: 'Façade et toiture',
    eyebrow: 'Façade et toiture',
    h1: 'Traitement de façade et toiture à Rennes et en Bretagne',
    metaTitle: 'Traitement façade et toiture à Rennes et en Bretagne | HYNERA',
    ogTitle: 'Traitement de façade et toiture en Bretagne',
    metaDescription: 'Démoussage et traitement de façade et toiture à Rennes et en Bretagne. Nettoyage, traitement hydrofuge et protection durable. Devis gratuit sur place.',
    serviceName: 'Traitement de façade et toiture',
    serviceDescription: 'Démoussage, nettoyage et traitement hydrofuge des façades et toitures.',
    intro: 'Le climat breton favorise mousses et lichens sur les toitures et façades. On nettoie, on traite et on protège pour redonner un coup de neuf à votre maison.',
    sections: [
      { h2: 'Pourquoi entretenir sa toiture', paragraphs: [
        'Les mousses retiennent l\'humidité et finissent par soulever les tuiles et boucher les évacuations. Sur la durée, c\'est l\'étanchéité du toit qui est en jeu.',
        'Un entretien régulier prolonge la vie de votre couverture et évite des réparations bien plus coûteuses.' ] },
      { h2: 'Ce que comprend notre intervention', paragraphs: [
        'On adapte chaque étape à l\'état de votre toiture ou de votre façade :' ],
        list: [
          'Grattage et démoussage manuel des surfaces.',
          'Nettoyage basse ou haute pression selon le support.',
          'Application d\'un traitement anti-mousse.',
          'Traitement hydrofuge qui protège contre l\'eau et ralentit le retour des mousses.' ] },
      { h2: 'Façades : nettoyage et protection', paragraphs: [
        'Sur les façades, on retire les traces de pollution, les mousses et les lichens. On applique ensuite un traitement adapté au matériau, qu\'il s\'agisse d\'enduit, de pierre ou de crépi.',
        'Le résultat est immédiat : une façade propre et protégée, qui garde son aspect plus longtemps.' ] },
      { h2: 'Un devis adapté à votre maison', paragraphs: [
        'Chaque toiture et chaque façade sont différentes. On se déplace pour évaluer la surface, l\'accès et l\'état du support avant de vous remettre un devis clair.',
        'On travaille en sécurité, avec le matériel adapté à la hauteur et à la configuration du chantier.',
        'On intervient sur les maisons individuelles comme sur les bâtiments collectifs et les locaux professionnels. Selon vos besoins, on peut prévoir une visite d\'entretien régulière pour garder votre toiture et votre façade en bon état année après année.' ] },
    ],
    faq: [
      { q: 'À quelle fréquence démousser ma toiture ?', a: 'Tous les cinq à dix ans selon l\'exposition. Une toiture orientée nord ou entourée d\'arbres se couvre de mousse plus vite.' },
      { q: 'Le traitement hydrofuge, à quoi ça sert ?', a: 'Il rend la surface imperméable, l\'eau glisse au lieu de pénétrer. Cela protège les tuiles et ralentit nettement le retour des mousses.' },
      { q: 'Intervenez-vous sur tous les types de toiture ?', a: 'Oui, tuiles, ardoises, fibrociment. On adapte la méthode de nettoyage et le produit au matériau de votre couverture.' },
      { q: 'Le devis est-il payant ?', a: 'Non. On se déplace pour évaluer le chantier et le devis est gratuit et sans engagement.' },
    ],
  },
];

/* ---------- Local SEO pages ---------- */

const locals = [
  {
    slug: 'deratisation-rennes',
    crumb: 'Dératisation à Rennes',
    crumbCat: 'Interventions',
    eyebrow: 'Dératisation à Rennes',
    h1: 'Dératisation à Rennes (35)',
    metaTitle: 'Dératisation à Rennes (35) | HYNERA Environnement',
    ogTitle: 'Dératisation à Rennes',
    metaDescription: 'Dératisation à Rennes et dans toute l\'agglomération. On traite rats et souris, on pose les pièges et on assure le suivi. Intervention rapide, devis gratuit.',
    serviceName: 'Dératisation à Rennes',
    serviceDescription: 'Traitement des rongeurs à Rennes et dans l\'agglomération rennaise.',
    intro: 'Notre siège est à Bruz, aux portes de Rennes. On intervient vite dans toute la métropole pour traiter rats et souris, chez les particuliers comme dans les entreprises.',
    sections: [
      { h2: 'Une intervention rapide sur Rennes', paragraphs: [
        'Basés à Bruz, on connaît bien Rennes et son agglomération. Centre-ville, quartiers résidentiels, zones d\'activité : on se déplace rapidement où que vous soyez.',
        'Les immeubles anciens du centre et les réseaux d\'assainissement favorisent la présence de rongeurs. On adapte notre méthode au type de bâtiment.' ] },
      { h2: 'Rats et souris : on traite à la source', paragraphs: [
        'On repère les points d\'entrée, on installe des postes d\'appâtage sécurisés et on revient contrôler. L\'objectif est de traiter la colonie et d\'empêcher son retour.',
        'Pour les commerces et restaurants rennais, on met en place un plan de lutte et un registre conforme aux contrôles d\'hygiène.' ] },
      { h2: 'Particuliers, syndics et professionnels', paragraphs: [
        'On travaille avec les habitants, les syndics de copropriété et les professionnels de Rennes. On intervient en discrétion et on s\'adapte à vos horaires.',
        'Nos interventions sont garanties : si l\'activité reprend, on revient régler le problème.' ] },
    ],
    faq: [
      { q: 'Intervenez-vous dans tout Rennes ?', a: 'Oui, dans Rennes et toute la métropole : Cesson-Sévigné, Bruz, Chantepie, Saint-Grégoire et les communes voisines.' },
      { q: 'Sous combien de temps venez-vous ?', a: 'Depuis Bruz, on intervient très rapidement sur Rennes, souvent sous 24 à 48h selon l\'urgence.' },
      { q: 'Travaillez-vous avec les syndics ?', a: 'Oui, on accompagne les copropriétés rennaises avec des interventions ponctuelles ou des contrats de suivi.' },
      { q: 'Les appâts sont-ils sécurisés ?', a: 'Oui, on utilise des postes fermés et sécurisés, hors de portée des enfants et des animaux domestiques.' },
    ],
  },
  {
    slug: 'deratisation-saint-malo',
    crumb: 'Dératisation à Saint-Malo',
    crumbCat: 'Interventions',
    eyebrow: 'Dératisation à Saint-Malo',
    h1: 'Dératisation à Saint-Malo (35)',
    metaTitle: 'Dératisation à Saint-Malo (35) | HYNERA Environnement',
    ogTitle: 'Dératisation à Saint-Malo',
    metaDescription: 'Dératisation à Saint-Malo et sur la côte d\'Émeraude. On traite rats et souris, particuliers et professionnels. Intervention rapide depuis notre agence de Taden.',
    serviceName: 'Dératisation à Saint-Malo',
    serviceDescription: 'Traitement des rongeurs à Saint-Malo et sur la côte d\'Émeraude.',
    intro: 'Depuis notre agence de Taden, tout près de Dinan, on intervient rapidement sur Saint-Malo et la côte d\'Émeraude contre les rats et les souris.',
    sections: [
      { h2: 'Présents sur la côte d\'Émeraude', paragraphs: [
        'Notre agence de Taden nous permet de couvrir Saint-Malo, Dinard, Cancale et toute la côte. On connaît les contraintes des zones portuaires et touristiques.',
        'La ville de Saint-Malo nous a confié un contrat de dératisation sur le domaine public, signe de la confiance des collectivités locales.' ] },
      { h2: 'Une méthode efficace et suivie', paragraphs: [
        'On identifie les zones de passage, on pose des postes d\'appâtage sécurisés et on assure le suivi jusqu\'au traitement complet des rongeurs.',
        'Pour les commerces du centre historique et les restaurants du port, on adapte nos horaires et on tient un registre conforme aux normes d\'hygiène.' ] },
      { h2: 'Pour les habitants et les professionnels', paragraphs: [
        'Maisons, appartements, commerces, restaurants : on traite chaque situation avec la même rigueur. On vous conseille aussi pour éviter le retour des rongeurs.',
        'Nos interventions sont garanties sur résultat.' ] },
    ],
    faq: [
      { q: 'Depuis quelle agence intervenez-vous à Saint-Malo ?', a: 'Depuis notre agence de Taden, à côté de Dinan, ce qui nous permet d\'être rapidement sur place.' },
      { q: 'Couvrez-vous toute la côte d\'Émeraude ?', a: 'Oui, Saint-Malo, Dinard, Cancale, Dinan et les communes du littoral.' },
      { q: 'Travaillez-vous pour les restaurants du port ?', a: 'Oui, on accompagne les professionnels avec des passages réguliers et un registre conforme aux contrôles d\'hygiène.' },
      { q: 'Vos interventions sont-elles garanties ?', a: 'Oui, toutes nos dératisations sont garanties. Si l\'activité reprend, on revient sans frais.' },
    ],
  },
  {
    slug: 'nuisibles-vannes',
    crumb: 'Nuisibles à Vannes',
    crumbCat: 'Interventions',
    eyebrow: 'Lutte contre les nuisibles à Vannes',
    h1: 'Lutte contre les nuisibles à Vannes (56)',
    metaTitle: 'Lutte contre les nuisibles à Vannes (56) | HYNERA',
    ogTitle: 'Lutte contre les nuisibles à Vannes',
    metaDescription: 'Lutte contre les nuisibles à Vannes et dans le Morbihan : dératisation, désinsectisation, guêpes et frelons. Intervention depuis notre agence de Ploërmel.',
    serviceName: 'Lutte contre les nuisibles à Vannes',
    serviceDescription: 'Dératisation, désinsectisation et traitement des nuisibles à Vannes et dans le Morbihan.',
    intro: 'Depuis notre agence de Ploërmel, on couvre Vannes et le Morbihan pour tous vos problèmes de nuisibles : rongeurs, insectes, guêpes et frelons.',
    sections: [
      { h2: 'Tous les nuisibles, une seule équipe', paragraphs: [
        'À Vannes comme ailleurs, les problèmes de nuisibles sont variés. On traite aussi bien les rats et les souris que les cafards, les punaises de lit ou les nids de frelons.',
        'Notre agence de Ploërmel nous permet d\'intervenir rapidement sur Vannes, le golfe du Morbihan et les communes alentour.' ] },
      { h2: 'Nos prestations à Vannes', paragraphs: [
        'On intervient chez vous pour :' ],
        list: [
          'La dératisation : rats, souris, campagnols.',
          'La désinsectisation : cafards, punaises de lit, fourmis.',
          'La destruction de nids de guêpes et de frelons.',
          'Le traitement du bois et le dépigeonnage.' ] },
      { h2: 'Réactivité et garantie', paragraphs: [
        'En période estivale, les nids de frelons et de guêpes demandent une intervention rapide. On assure une astreinte le week-end de juin à décembre.',
        'Toutes nos interventions sont garanties sur résultat, pour les particuliers comme pour les professionnels du bassin vannetais.' ] },
    ],
    faq: [
      { q: 'Depuis où intervenez-vous à Vannes ?', a: 'Depuis notre agence de Ploërmel, ce qui nous permet de couvrir Vannes et tout le Morbihan rapidement.' },
      { q: 'Détruisez-vous les nids de frelons en urgence ?', a: 'Oui, on intervient vite sur les nids de guêpes et de frelons, avec une astreinte le week-end de juin à décembre.' },
      { q: 'Traitez-vous les punaises de lit à Vannes ?', a: 'Oui, avec un protocole complet et un deuxième passage si nécessaire pour ne rien laisser passer.' },
      { q: 'Intervenez-vous autour du golfe du Morbihan ?', a: 'Oui, on couvre Vannes, le golfe et les communes voisines depuis Ploërmel.' },
    ],
  },
  {
    slug: 'desinsectisation-rennes',
    crumb: 'Désinsectisation à Rennes',
    crumbCat: 'Interventions',
    eyebrow: 'Désinsectisation à Rennes',
    h1: 'Désinsectisation à Rennes (35)',
    metaTitle: 'Désinsectisation à Rennes (35) | HYNERA Environnement',
    ogTitle: 'Désinsectisation à Rennes',
    metaDescription: 'Désinsectisation à Rennes : cafards, punaises de lit, fourmis, guêpes et frelons. On intervient chez vous sous 48h depuis notre siège de Bruz. Devis gratuit.',
    serviceName: 'Désinsectisation à Rennes',
    serviceDescription: 'Traitement des insectes nuisibles à Rennes et dans l\'agglomération rennaise.',
    intro: 'Notre siège est à Bruz, aux portes de Rennes. On intervient sous 48h dans toute la métropole contre les cafards, punaises de lit, fourmis, guêpes et frelons.',
    sections: [
      { h2: 'Une intervention rapide sur Rennes', paragraphs: [
        'Depuis Bruz, on se déplace vite sur Rennes et son agglomération. Les appartements du centre, les résidences étudiantes et les commerces sont souvent concernés par les insectes.',
        'On identifie l\'insecte, on traite la source et on vous donne les conseils pour éviter qu\'il revienne.' ] },
      { h2: 'Cafards et punaises de lit', paragraphs: [
        'Les cafards apprécient les cuisines et les vide-ordures des immeubles. On traite l\'ensemble des foyers pour stopper leur propagation entre logements.',
        'Pour les punaises de lit, fréquentes dans une ville étudiante comme Rennes, on applique un protocole complet avec un deuxième passage si nécessaire.' ] },
      { h2: 'Guêpes, frelons et autres insectes', paragraphs: [
        'On détruit les nids de guêpes et de frelons, y compris les frelons asiatiques en hauteur, avec une astreinte le week-end de juin à décembre.',
        'On traite aussi fourmis, mouches, moustiques et chenilles processionnaires, chez les particuliers comme dans les locaux professionnels rennais.' ] },
    ],
    faq: [
      { q: 'Sous combien de temps intervenez-vous à Rennes ?', a: 'On intervient sous 48h pour la désinsectisation, et plus vite en cas d\'urgence comme un nid de guêpes ou de frelons.' },
      { q: 'Traitez-vous les résidences étudiantes ?', a: 'Oui, on intervient dans les logements étudiants et les copropriétés rennaises, notamment pour les punaises de lit.' },
      { q: 'Combien de passages pour les punaises de lit ?', a: 'En général deux, espacés de quelques semaines, le temps de traiter les œufs qui éclosent après le premier passage.' },
      { q: 'Intervenez-vous pour les commerces ?', a: 'Oui, restaurants, commerces et bureaux du centre de Rennes, avec des créneaux adaptés à votre activité.' },
    ],
  },
  {
    slug: 'traitement-bois-bretagne',
    crumb: 'Traitement du bois en Bretagne',
    crumbCat: 'Interventions',
    eyebrow: 'Traitement du bois en Bretagne',
    h1: 'Traitement du bois en Bretagne',
    metaTitle: 'Traitement du bois en Bretagne | HYNERA Environnement',
    ogTitle: 'Traitement du bois en Bretagne',
    metaDescription: 'Traitement du bois et des charpentes en Bretagne : termites, capricornes, vrillettes. Trois agences pour couvrir le Grand Ouest. Devis gratuit, traitement garanti.',
    serviceName: 'Traitement du bois en Bretagne',
    serviceDescription: 'Traitement curatif et préventif des bois et charpentes dans toute la Bretagne.',
    intro: 'Avec nos trois agences de Bruz, Ploërmel et Taden, on traite les charpentes et boiseries dans toute la Bretagne contre les insectes et les champignons du bois.',
    sections: [
      { h2: 'Une couverture sur toute la Bretagne', paragraphs: [
        'Nos agences de Bruz, Ploërmel et Taden nous permettent de couvrir l\'Ille-et-Vilaine, le Morbihan et les Côtes-d\'Armor, ainsi que le reste du Grand Ouest.',
        'Le climat humide de la région favorise les attaques d\'insectes et le développement des champignons dans le bois. Un traitement adapté protège votre patrimoine.' ] },
      { h2: 'Insectes et champignons du bois', paragraphs: [
        'On traite les principales menaces qui pèsent sur les charpentes bretonnes :' ],
        list: [
          'Capricornes et vrillettes, dans les charpentes et boiseries.',
          'Termites, présents dans certaines zones de la région.',
          'Lyctus, qui visent les bois feuillus.',
          'Champignons comme la mérule, favorisés par l\'humidité.' ] },
      { h2: 'Diagnostic, traitement et garantie', paragraphs: [
        'On sonde le bois, on identifie l\'agent responsable et on applique le traitement adapté : bûchage, injection, pulvérisation et protection de surface.',
        'Toutes nos interventions sont garanties. On vous remet un compte rendu détaillé, utile notamment lors d\'une vente immobilière.' ] },
    ],
    faq: [
      { q: 'Couvrez-vous toute la Bretagne ?', a: 'Oui, grâce à nos trois agences de Bruz, Ploërmel et Taden, on intervient dans toute la région et le Grand Ouest.' },
      { q: 'Traitez-vous la mérule ?', a: 'Oui, on traite les champignons du bois comme la mérule, favorisés par l\'humidité. On agit sur la cause et sur les zones touchées.' },
      { q: 'Le traitement est-il garanti ?', a: 'Oui, toutes nos interventions de traitement du bois sont garanties. Si le problème persiste, on revient sans frais.' },
      { q: 'Fournissez-vous un compte rendu ?', a: 'Oui, on remet un compte rendu détaillé de l\'intervention, utile en cas de vente immobilière.' },
    ],
  },
];

/* ---------- Shared engagement section (boosts content + CTA) ---------- */
function engageSection() {
  return {
    h2: 'Pourquoi nous faire confiance',
    paragraphs: [
      'On est une entreprise bretonne et indépendante, créée en 2003 par Jacky Minier. Nos techniciens sont formés en interne et certifiés pour manipuler les produits en toute sécurité. Quand on intervient chez vous, on prend le temps de vous expliquer ce qu\'on fait et pourquoi on le fait. Pas de jargon, pas de mauvaise surprise sur la facture.',
      'On s\'appuie sur trois agences, à Bruz, Ploërmel et Taden, pour couvrir toute la Bretagne et venir vite. Selon l\'urgence, on intervient sous 24 à 48h, et on assure une astreinte le week-end de juin à décembre pour les guêpes et les frelons. On travaille aussi bien avec les particuliers qu\'avec les syndics, les commerces et les collectivités.',
    ],
    list: [
      'Devis gratuit et sans engagement, après une visite sur place si nécessaire.',
      'Garantie de résultat : si le problème persiste, on revient sans frais.',
      'Produits respectueux de l\'environnement, certifications CTBA+ et Certibiocide.',
      'Des conseils concrets pour éviter que le problème ne revienne.',
    ],
  };
}
services.forEach(s => s.sections.push(engageSection()));
locals.forEach(l => l.sections.push(engageSection()));

/* ---------- Mentions légales ---------- */

function legalPage() {
  return head({
    slug: 'mentions-legales',
    title: 'Mentions légales | HYNERA Environnement',
    ogTitle: 'Mentions légales HYNERA Environnement',
    description: 'Mentions légales du site HYNERA Environnement : éditeur, hébergeur et politique de traitement des données personnelles conforme au RGPD.',
    jsonld: '',
  }) + NAV + `
<main id="main" class="page-body">
  <nav class="breadcrumb" aria-label="Fil d'Ariane">
    <div class="container breadcrumb-inner">
      <a href="index.html">Accueil</a>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-current">Mentions légales</span>
    </div>
  </nav>
  <section class="page-section">
    <div class="container legal-content">
      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>Le présent site est édité par&nbsp;:</p>
      <ul>
        <li><strong>HYNERA Environnement</strong>, SARL Unipersonnelle</li>
        <li>Siège social : 3 Impasse Pierre-Gilles De Gennes, 35170 Bruz</li>
        <li>Téléphone : ${PHONE}</li>
        <li>Email : contact@hynera.fr</li>
      </ul>

      <h2>Responsable de la publication</h2>
      <p>Le responsable de la publication est M. Jacky Minier, gérant de HYNERA Environnement.</p>

      <h2>Hébergeur</h2>
      <p>Le site est hébergé par&nbsp;:</p>
      <ul>
        <li>Netlify, Inc.</li>
        <li>512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis</li>
        <li>Site : <a href="https://www.netlify.com" target="_blank" rel="noopener">www.netlify.com</a></li>
      </ul>

      <h2 id="rgpd">Données personnelles et RGPD</h2>
      <p>Les informations recueillies via le formulaire de contact (nom, email, téléphone, service concerné, profil, niveau d'urgence et message) servent uniquement à traiter votre demande de devis ou d'intervention. Elles ne sont ni revendues ni cédées à des tiers.</p>
      <h3>Finalité du traitement</h3>
      <p>Les données transmises sont utilisées pour répondre à votre demande, planifier une intervention et assurer le suivi de votre dossier.</p>
      <h3>Durée de conservation</h3>
      <p>Les données sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées conformément à la réglementation en vigueur.</p>
      <h3>Vos droits</h3>
      <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Pour l'exercer, écrivez-nous à <a href="mailto:contact@hynera.fr">contact@hynera.fr</a> ou par courrier au siège social.</p>
      <h3>Cookies</h3>
      <p>Le site utilise des cookies de mesure d'audience pour améliorer votre navigation. Un bandeau vous permet d'accepter ou de refuser ces cookies dès votre première visite. Votre choix est conservé et vous pouvez en changer en supprimant les données du site dans votre navigateur.</p>

      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble des contenus de ce site (textes, images, logo, mise en page) est la propriété de HYNERA Environnement, sauf mention contraire. Toute reproduction sans autorisation est interdite.</p>
    </div>
  </section>
</main>` + FOOTER;
}

/* ---------- Sitemap & robots ---------- */

function sitemap() {
  const urls = ['', 'mentions-legales']
    .concat(services.map(s => s.slug))
    .concat(locals.map(l => l.slug));
  const today = new Date().toISOString().slice(0, 10);
  const body = urls.map(u => {
    const loc = u === '' ? SITE + '/' : SITE + '/' + u;
    const pr = u === '' ? '1.0' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${pr}</priority>\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
}

/* ---------- Write everything ---------- */

let count = 0;
function write(file, content) {
  fs.writeFileSync(path.join(ROOT, file), content);
  count++;
  console.log('  +', file);
}

services.forEach(s => write(s.slug + '.html', buildPage(s)));
locals.forEach(l => write(l.slug + '.html', buildPage(l)));
write('mentions-legales.html', legalPage());
write('sitemap.xml', sitemap());
write('robots.txt', robots());

console.log('\nDone. ' + count + ' files generated.');
