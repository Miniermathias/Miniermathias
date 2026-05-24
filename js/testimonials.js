export function initTestimonials() {
  const track  = document.getElementById('testimonials-track');
  const dots   = document.getElementById('t-dots');
  const prev   = document.getElementById('t-prev');
  const next   = document.getElementById('t-next');
  if (!track) return;

  const cards  = track.querySelectorAll('.testimonial-card');
  const total  = cards.length;
  let cur = 0, timer, paused = false;

  function visible() { return window.innerWidth>=1100?3:window.innerWidth>=768?2:1; }
  function maxIdx()  { return Math.max(0, total - visible()); }

  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    for (let i = 0; i <= maxIdx(); i++) {
      const d = document.createElement('button');
      d.className = 't-dot' + (i===cur?' active':'');
      d.setAttribute('aria-label', `Avis ${i+1}`);
      d.onclick = () => goto(i);
      dots.appendChild(d);
    }
  }

  function updateDots() { dots?.querySelectorAll('.t-dot').forEach((d,i) => d.classList.toggle('active',i===cur)); }

  function goto(i) {
    cur = Math.max(0, Math.min(i, maxIdx()));
    track.style.transform = `translateX(-${cur*(100/visible())}%)`;
    updateDots();
  }

  function goNext() { goto(cur >= maxIdx() ? 0 : cur+1); }
  function goPrev() { goto(cur <= 0 ? maxIdx() : cur-1); }

  prev?.addEventListener('click', () => { goPrev(); reset(); });
  next?.addEventListener('click', () => { goNext(); reset(); });

  function start() { timer = setInterval(() => { if (!paused) goNext(); }, 5000); }
  function reset() { clearInterval(timer); start(); }

  track.closest('.testimonials-carousel')?.addEventListener('mouseenter', () => paused=true);
  track.closest('.testimonials-carousel')?.addEventListener('mouseleave', () => paused=false);

  /* Touch */
  let tx = 0;
  track.addEventListener('touchstart', e => tx=e.touches[0].clientX, {passive:true});
  track.addEventListener('touchend',   e => { const d=tx-e.changedTouches[0].clientX; if(Math.abs(d)>45){d>0?goNext():goPrev(); reset();} }, {passive:true});

  window.addEventListener('resize', () => { buildDots(); goto(cur); });

  buildDots(); goto(0); start();
}
