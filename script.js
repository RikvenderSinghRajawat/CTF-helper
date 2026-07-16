(() => {
  'use strict';

  // Reveal animation on scroll
  function initRevealObserver() {
    const revealNodes = document.querySelectorAll('.reveal');
    if (!revealNodes.length || !('IntersectionObserver' in window)) {
      revealNodes.forEach(node => node.style.opacity = '1');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealNodes.forEach(node => observer.observe(node));
  }

  // Active nav link
  function updateActiveNav() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.main-nav a').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === currentPath || (href === '/' && currentPath === '/'));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initRevealObserver();
    updateActiveNav();
  });
})();
