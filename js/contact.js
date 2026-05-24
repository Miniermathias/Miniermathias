export function initContactForm() {
  const form    = document.getElementById('contact-form');
  const wrapper = document.getElementById('form-wrapper');
  const success = document.getElementById('form-success');
  if (!form) return;

  /* Floating labels */
  form.querySelectorAll('.form-group').forEach(g => {
    const inp = g.querySelector('input,textarea,select');
    if (!inp) return;
    const check = () => g.classList.toggle('has-value', inp.value.length > 0);
    inp.addEventListener('focus',  () => g.classList.add('focused'));
    inp.addEventListener('blur',   () => { g.classList.remove('focused'); check(); });
    inp.addEventListener('input',  check);
    inp.addEventListener('change', check);
    check();
    setTimeout(check, 600);
  });

  /* Char counter */
  const ta  = form.querySelector('textarea');
  const cnt = document.getElementById('char-count');
  const cc  = form.querySelector('.char-counter');
  if (ta && cnt) {
    ta.addEventListener('input', () => {
      const l = ta.value.length;
      cnt.textContent = l;
      cc?.classList.toggle('warn', l > 400);
      cc?.classList.toggle('max',  l >= 500);
    });
  }

  /* Validators */
  const v = {
    nom:       { fn: s => s.trim().length >= 2,              msg: 'Nom requis (2 caractères min).' },
    email:     { fn: s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s), msg: 'Email invalide.' },
    telephone: { fn: s => s===''||/^(\+33|0)[1-9](\d{2}){4}$/.test(s.replace(/\s/g,'')), msg: 'Téléphone invalide.' },
    message:   { fn: s => s.trim().length >= 10,             msg: 'Message trop court (10 min).' },
  };

  function setError(g, msg) {
    g.classList.add('error');
    const m = g.querySelector('.form-error-msg');
    if (m) m.textContent = msg;
    g.classList.add('shake');
    g.addEventListener('animationend', () => g.classList.remove('shake'), {once:true});
  }
  function clearError(g) { g.classList.remove('error'); const m = g.querySelector('.form-error-msg'); if(m) m.textContent=''; }

  form.querySelectorAll('[name]').forEach(inp => {
    inp.addEventListener('blur', () => {
      const vr = v[inp.name]; if (!vr) return;
      const g  = inp.closest('.form-group');
      vr.fn(inp.value) ? clearError(g) : setError(g, vr.msg);
    });
  });

  /* Submit */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[name]').forEach(inp => {
      const vr = v[inp.name]; if (!vr) return;
      const g  = inp.closest('.form-group');
      if (!vr.fn(inp.value)) { setError(g, vr.msg); ok=false; } else clearError(g);
    });
    if (!ok) return;

    const btn = document.getElementById('form-submit');
    btn.classList.add('loading'); btn.disabled=true;
    await new Promise(r => setTimeout(r, 1600));
    btn.classList.remove('loading'); btn.disabled=false;

    if (wrapper) wrapper.style.display='none';
    if (success)  success.hidden=false;
  });
}
