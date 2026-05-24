export function initServiceCards() {
  if ('ontouchstart' in window) return;
  const MAX = 10;
  document.querySelectorAll('.service-card').forEach(card => {
    const glare = card.querySelector('.service-glare');
    card.addEventListener('mouseenter', () => { card.style.willChange = 'transform'; });
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const nx = (e.clientX - r.left - r.width/2)  / (r.width/2);
      const ny = (e.clientY - r.top  - r.height/2) / (r.height/2);
      card.style.transform = `perspective(1000px) rotateX(${-ny*MAX}deg) rotateY(${nx*MAX}deg) translateY(-6px) scale(1.01)`;
      card.style.transition = 'box-shadow .3s,border-color .3s';
      if (glare) { glare.style.setProperty('--gx',`${((e.clientX-r.left)/r.width)*100}%`); glare.style.setProperty('--gy',`${((e.clientY-r.top)/r.height)*100}%`); }
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = '';
      card.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1),box-shadow .3s,border-color .3s';
      card.style.transform  = '';
    });
  });
}
