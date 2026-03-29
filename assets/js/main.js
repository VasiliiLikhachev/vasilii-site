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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── Lang from URL param
  const urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang && ['en','ru'].includes(urlLang)) setLang(urlLang);

});
