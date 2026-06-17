document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.page-list button[data-target]');
  const pageLinks = document.querySelectorAll('.page-nav a');
  const revealItems = document.querySelectorAll('.page-list > li, .sub-list button, .content-panel, .right-sidebar, .header h1');

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      scrollToSection(button.dataset.target);
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20% 0px',
  });

  revealItems.forEach((el, index) => {
    el.classList.add('revealable');
    el.style.setProperty('--reveal-delay', `${Math.min(index * 20, 120)}ms`);
    observer.observe(el);
  });

  if (window.location.hash) {
    const targetId = window.location.hash.slice(1);
    setTimeout(() => scrollToSection(targetId), 100);
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  pageLinks.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
