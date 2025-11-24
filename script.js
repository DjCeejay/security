const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = Array.from(navLinks).map(link => {
  const id = link.getAttribute('href').slice(1);
  return document.getElementById(id);
});
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const setActive = () => {
  const offset = window.innerHeight * 0.2;
  let activeIndex = 0;

  sections.forEach((section, idx) => {
    if (section && section.getBoundingClientRect().top - offset <= 0) {
      activeIndex = idx;
    }
  });

  navLinks.forEach((link, idx) => {
    link.classList.toggle('active', idx === activeIndex);
  });
};

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

window.addEventListener('scroll', setActive, { passive: true });
setActive();
