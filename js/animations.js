export function initAnimations() {
  const els = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale,.reveal-fade');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('visible'), delay);
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.08, rootMargin: '0px 0px -40px 0px'});
  els.forEach(el => obs.observe(el));
}
