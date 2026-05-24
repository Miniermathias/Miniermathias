export function initCursor() {
  if ('ontouchstart' in window || window.matchMedia('(pointer:coarse)').matches) return;
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx=0, my=0, rx=0, ry=0;

  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; }, {passive:true});

  const sel = 'a,button,[role="button"],input,textarea,select,.service-card,label';
  document.addEventListener('mouseover', e => {
    const hover = e.target.matches(sel) || e.target.closest(sel);
    ring.classList.toggle('hovered', !!hover);
    dot.classList.toggle('hovered',  !!hover);
  });
  document.addEventListener('mousedown', () => { dot.classList.add('clicking'); ring.classList.add('clicking'); });
  document.addEventListener('mouseup',   () => { dot.classList.remove('clicking'); ring.classList.remove('clicking'); });
  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity='1'; ring.style.opacity='1'; });

  function lerp(a,b,t){return a+(b-a)*t}
  (function loop(){rx=lerp(rx,mx,.12); ry=lerp(ry,my,.12); ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop);})();
}
