export function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 4);

  function animate(el) {
    if (el.dataset.done === '1') return;
    el.dataset.done = '1';
    const target   = parseInt(el.dataset.count, 10) || 0;
    const suffix   = el.dataset.suffix || '';
    const duration = 2000;
    const start    = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(easeOut(p) * target).toLocaleString('fr-FR') + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('fr-FR') + suffix;
    }
    requestAnimationFrame(step);
  }

  /* Trigger only when the element enters the viewport */
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); o.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

  counters.forEach(el => {
    el.textContent = '0';
    obs.observe(el);
  });
}
