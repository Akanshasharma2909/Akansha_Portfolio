// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Rotating role text
const roles = ['Aspiring AI Engineer', 'Java Developer', 'Full Stack Developer', 'AI & Product Enthusiast'];
const roleText = document.getElementById('roleText');
let roleIndex = 0;
if (roleText) setInterval(() => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleText.style.opacity = '0';
  setTimeout(() => { roleText.textContent = roles[roleIndex]; roleText.style.opacity = '1'; }, 180);
}, 2600);

// Project category filters
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(btn => btn.classList.remove('active'));
  filter.classList.add('active');
  const category = filter.dataset.filter;
  projects.forEach(project => {
    project.hidden = category !== 'all' && project.dataset.category !== category;
  });
}));

// Reveal sections as they enter view
const revealTargets = document.querySelectorAll('.section-head, .about-grid, .skill-panel, .project-card, .leadership-grid, .education-item, .cert-card, .learning-strip, .interest, .resume-card, .contact-grid');
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: .12});
  revealTargets.forEach(el => observer.observe(el));
} else revealTargets.forEach(el => el.classList.add('visible'));

// Highlight the current section in navigation
const sectionIds = ['home','about','skills','projects','education','certifications','contact'];
const sectionObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks?.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin: '-35% 0px -55% 0px'}) : null;
sectionIds.forEach(id => { const section = document.getElementById(id); if(section) sectionObserver?.observe(section); });

// Mailto fallback: validates fields and prepares an email in the user's email client.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const name = String(data.get('name')).trim();
  const email = String(data.get('email')).trim();
  const subject = String(data.get('subject')).trim();
  const message = String(data.get('message')).trim();
  if (message.length < 10) { formStatus.textContent = 'Please write a little more in your message (at least 10 characters).'; return; }
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:akansha298@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'Your email app should open with the message prepared. The website itself has not sent anything.';
  window.location.href = mailto;
});

// Placeholder credential link is intentionally not a false URL.
document.querySelectorAll('[data-placeholder]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); alert(link.dataset.placeholder);
}));
