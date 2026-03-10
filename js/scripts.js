/* ============================================================
   BRASIL CULTURAL — SCRIPTS.JS
   ============================================================ */

(function () {
  'use strict';

  /* --- Navbar scroll effect --- */
  var navbar = document.querySelector('.navbar');

  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 70) {
      navbar.classList.add('scrolled');
      if (btnTopo) btnTopo.style.display = 'flex';
    } else {
      navbar.classList.remove('scrolled');
      if (btnTopo) btnTopo.style.display = 'none';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* --- Back to top --- */
  var btnTopo = document.getElementById('voltarTopo');

  window.voltarTopo = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* --- Reveal on scroll (IntersectionObserver) --- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el, i) {
      /* Stagger cards in the same row */
      var delay = (i % 3) * 0.14;
      el.style.transitionDelay = delay + 's';
      observer.observe(el);
    });
  } else {
    /* Fallback for old browsers */
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* --- Active nav link highlight --- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

})();
