export function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('mobileMenu');
  const links     = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  if (!navbar) return;

  /* Scroll state */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { navbar.classList.toggle('scrolled', window.scrollY > 60); ticking=false; }); ticking=true; }
  }, {passive:true});
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  /* Scroll spy */
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href')==='#'+id));
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px', threshold:0}).observe || sections.forEach(s => {});
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ const id=e.target.id; links.forEach(l => l.classList.toggle('active',l.getAttribute('href')==='#'+id)); }});
  }, {rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(s => spy.observe(s));

  /* Mobile menu */
  function close() { menu?.classList.remove('open'); hamburger?.classList.remove('active'); hamburger?.setAttribute('aria-expanded','false'); menu?.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  function toggle() {
    const open = menu?.classList.toggle('open');
    hamburger?.classList.toggle('active', open);
    hamburger?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  hamburger?.addEventListener('click', toggle);
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => { if(menu?.classList.contains('open') && !menu.contains(e.target) && !hamburger?.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if(e.key==='Escape') close(); });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - offset, behavior:'smooth'});
    });
  });

  /* Page loader */
  window.addEventListener('load', () => setTimeout(() => document.getElementById('page-loader')?.classList.add('hidden'), 900));
}
