export function initContactForm() {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  const FRELON_MSG = "Bon à savoir : le traitement des nids de frelons asiatiques est souvent pris en charge, en partie ou en totalité, par votre commune. On vérifie le dispositif de votre mairie et on vous le confirme lors du rappel.";

  /* Sous-liste conditionnelle : type de nuisible si le service est "Désinsectisation" */
  const serviceSel  = document.getElementById('service');
  const detailGroup = document.getElementById('service-detail-group');
  const detailSel   = document.getElementById('service-detail');
  function toggleDetail() {
    if (!detailGroup) return;
    const show = serviceSel && serviceSel.value === 'Désinsectisation';
    detailGroup.hidden = !show;
    if (!show && detailSel) detailSel.value = '';
  }
  if (serviceSel) { serviceSel.addEventListener('change', toggleDetail); toggleDetail(); }

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
    nom:       { fn: s => s.trim().length >= 2,                 msg: 'Nom requis (2 caractères min).' },
    email:     { fn: s => s === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s), msg: 'Email invalide.' },
    telephone: { fn: s => /^(\+33|0)[1-9](\d{2}){4}$/.test(s.replace(/\s/g, '')), msg: 'Téléphone requis (ex. 02 99 00 62 35).' },
    message:   { fn: s => s.trim().length >= 10,                msg: 'Message trop court (10 min).' },
    code_postal:{ fn: s => s === '' || /^\d{5}$/.test(s.trim()), msg: 'Code postal à 5 chiffres.' },
  };

  function setError(g, msg) {
    g.classList.add('error');
    const m = g.querySelector('.form-error-msg');
    if (m) m.textContent = msg;
    g.classList.add('shake');
    g.addEventListener('animationend', () => g.classList.remove('shake'), { once: true });
  }
  function clearError(g) { g.classList.remove('error'); const m = g.querySelector('.form-error-msg'); if (m) m.textContent = ''; }

  form.querySelectorAll('[name]').forEach(inp => {
    inp.addEventListener('blur', () => {
      const vr = v[inp.name]; if (!vr) return;
      const g = inp.closest('.form-group');
      vr.fn(inp.value) ? clearError(g) : setError(g, vr.msg);
    });
  });

  function showFeedback(type, text) {
    if (!feedback) return;
    feedback.hidden = false;
    feedback.className = 'form-feedback ' + type;
    feedback.textContent = text;
  }

  /* Submit -> real POST to Netlify Forms */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (feedback) feedback.hidden = true;

    let ok = true;
    form.querySelectorAll('[name]').forEach(inp => {
      const vr = v[inp.name]; if (!vr) return;
      const g = inp.closest('.form-group');
      if (!vr.fn(inp.value)) { setError(g, vr.msg); ok = false; } else clearError(g);
    });
    if (!ok) return;

    const btn = document.getElementById('form-submit');
    btn.classList.add('loading');
    btn.disabled = true;

    const data = new URLSearchParams(new FormData(form)).toString();

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data,
      });
      btn.classList.remove('loading');
      btn.disabled = false;

      if (res.ok) {
        const frelon = detailSel && detailSel.value === 'Frelons asiatiques';
        window.location.href = frelon ? '/merci?n=frelon' : '/merci';
      } else {
        showFeedback('error', "Une erreur est survenue. Appelez-nous au 02 99 00 62 35.");
      }
    } catch (err) {
      btn.classList.remove('loading');
      btn.disabled = false;
      /* Netlify Forms only works once deployed. Locally the POST fails. */
      const frelon = detailSel && detailSel.value === 'Frelons asiatiques';
      showFeedback('info', (frelon ? FRELON_MSG + ' ' : '') + "L'envoi fonctionne une fois le site en ligne (Netlify). En attendant, appelez-nous au 02 99 00 62 35.");
    }
  });
}
