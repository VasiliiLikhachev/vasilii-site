document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll shadow
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // ── Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // ── Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  // ── Counter animation for stats
  function animateCounter(el) {
    if (el.closest('[data-no-counter]')) return;
    const text = el.textContent.trim();
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return;
    const prefix = text.match(/^[^0-9]*/)[0];
    const suffix = text.match(/[^0-9.]*$/)[0];
    const isInt = Number.isInteger(num);
    const duration = 1400;
    const steps = 60;
    let step = 0;
    el.textContent = prefix + (isInt ? '0' : '0.0') + suffix;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // ease-out curve: fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = step === steps ? num : num * eased;
      const display = isInt ? Math.round(current).toLocaleString() : current.toFixed(1);
      el.textContent = prefix + display + suffix;
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }

  function runStatCounters() {
    document.querySelectorAll('.stat-value').forEach(el => animateCounter(el));
  }

  // ── Observe stats section to trigger counters
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    let fired = false;
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !fired) {
          fired = true;
          runStatCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
    statsObserver.observe(statsSection);
  }

});
