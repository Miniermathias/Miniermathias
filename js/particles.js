export function initParticles(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const mobile = window.innerWidth < 768;
  const COUNT = mobile ? 35 : 90;
  const CONNECT = mobile ? 0 : 100;
  const REPEL = 80;
  let mouse = { x: null, y: null };
  let raf;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  const COLORS = ['rgba(245,146,30,','rgba(254,168,74,','rgba(255,255,255,','rgba(26,59,107,'];

  class P {
    reset(init = false) {
      this.x  = Math.random() * canvas.width;
      this.y  = init ? Math.random() * canvas.height : -8;
      this.r  = Math.random() * 1.8 + 0.8;
      this.vx = (Math.random() - .5) * .35;
      this.vy = Math.random() * .28 + .08;
      this.a  = Math.random() * .45 + .15;
      this.c  = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    constructor() { this.reset(true); }
    update() {
      if (mouse.x !== null) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < REPEL) { const f = (REPEL-d)/REPEL; this.vx += dx/d*f*.5; this.vy += dy/d*f*.5; }
      }
      this.vx *= .98; this.vy = Math.max(this.vy*.98, .05);
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) { this.vx *= -1; this.x = Math.max(0, Math.min(canvas.width, this.x)); }
      if (this.y > canvas.height + 8) this.reset();
    }
    draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=this.c+this.a+')'; ctx.fill(); }
  }

  const ps = Array.from({length:COUNT}, () => new P());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (CONNECT) {
      for (let i = 0; i < ps.length; i++) for (let j = i+1; j < ps.length; j++) {
        const dx = ps[i].x-ps[j].x, dy = ps[i].y-ps[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < CONNECT) { ctx.beginPath(); ctx.moveTo(ps[i].x,ps[i].y); ctx.lineTo(ps[j].x,ps[j].y); ctx.strokeStyle=`rgba(245,146,30,${(1-d/CONNECT)*.12})`; ctx.lineWidth=.7; ctx.stroke(); }
      }
    }
    ps.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }
  loop();

  if (!mobile) {
    const hero = canvas.closest('#hero') || document;
    hero.addEventListener('mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; }, {passive:true});
    hero.addEventListener('mouseleave', () => { mouse.x=null; mouse.y=null; }, {passive:true});
  }
  document.addEventListener('visibilitychange', () => { document.hidden ? cancelAnimationFrame(raf) : loop(); });
}
