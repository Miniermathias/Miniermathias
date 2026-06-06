/* Homepage-only: scroll-spy on sections + page loader.
   Mobile menu, scrolled state, dropdown and smooth-scroll
   are handled globally in site.js (loaded on every page). */
export function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  if (!navbar) return;

  /* Scroll spy */
  if (sections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* Page loader */
  window.addEventListener('load', () =>
    setTimeout(() => document.getElementById('page-loader')?.classList.add('hidden'), 900)
  );
}
