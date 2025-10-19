// script.js — interactions & micro-animations

document.addEventListener('DOMContentLoaded', () => {
  // set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // custom cursor
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', e => {
    if (!cursor) return;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  // Grow cursor on interactive hover
  document.querySelectorAll('a, button, .cta, .card-link, .form-submit-button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.9)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
  });

  // mobile nav toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('show'));
  }

  // scroll reveal using IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // show banner when ?submit=success param exists (fallback)
  const params = new URLSearchParams(window.location.search);
  if (params.get('submit') === 'success') {
    const s = document.getElementById('submission-success-message');
    if (s) {
      s.style.display = 'block';
      setTimeout(()=> s.style.display='none', 5000);
      // clean url
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // subtle parallax on mouse move for hero background DNA
  const hero = document.querySelector('.hero-section');
  const dna = document.querySelector('.dna-hero');
  hero?.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (dna) dna.style.transform = `translate(${(x-0.5)*6}%, ${(y-0.5)*6}%) rotate(-12deg)`;
  });

  // Play small floating stagger effect for service cards on load
  const floaties = document.querySelectorAll('.floaty');
  floaties.forEach((el, i) => {
    el.style.animationDelay = `${i * 180}ms`;
  });
});
