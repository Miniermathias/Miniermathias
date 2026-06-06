export function initCursor() {
  if ('ontouchstart' in window || window.matchMedia('(pointer:coarse)').matches) return;
  const dot = document.getElementById('cursor-dot');
  if (!dot) return;
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  }, { passive: true });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; });
  document.addEventListener('mousedown',  () => { dot.classList.add('clicking'); });
  document.addEventListener('mouseup',    () => { dot.classList.remove('clicking'); });
}
