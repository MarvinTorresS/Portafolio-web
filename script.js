// NAV HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ACTIVE NAV LINK ON SCROLL
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

// SCROLL REVEAL
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i % 4) * 0.08 + 's';
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// SKILL BARS
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.w + '%');
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-panel').forEach(p => barObs.observe(p));

// PROJECT FILTER
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(c => {
      c.style.display = (f === 'todos' || c.dataset.cat === f) ? 'block' : 'none';
    });
  });
});

// CONTACT FORM
document.getElementById('sendBtn').addEventListener('click', function() {
  const fields = document.querySelectorAll('.form-input, .form-textarea');
  const valid = [...fields].every(f => {
    const ok = f.value.trim() !== '';
    if (!ok) { f.style.borderColor = '#ff5566'; setTimeout(() => f.style.borderColor = '', 2000); }
    return ok;
  });
  if (valid) {
    this.textContent = '✓ Mensaje enviado';
    this.style.background = 'linear-gradient(135deg,#00a855,#00ff88)';
    setTimeout(() => {
      this.textContent = '✈ Enviar mensaje';
      this.style.background = '';
      fields.forEach(f => f.value = '');
    }, 3000);
  }
});

// SCROLL TO TOP
document.getElementById('scrollTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
