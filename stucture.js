document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const menuToggle = document.getElementById('menuToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  const navLinks = document.getElementById('navLinks');
  const moreBtn = document.getElementById('moreBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const arrowIcon = document.getElementById('arrowIcon');

  // 1. Dark/Light Mode Toggle Logic
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');

      if (isDark) {
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('portfolio-theme', 'dark');
      } else {
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('portfolio-theme', 'light');
      }
    });
  }

  // 2. Mobile Menu Toggle
  if (menuToggle && navLinks && toggleIcon) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('show');
      toggleIcon.classList.toggle('fa-bars', !isOpen);
      toggleIcon.classList.toggle('fa-xmark', isOpen);
    });
  }

  // 3. Dropdown Menu Toggle (More button)
  if (moreBtn && dropdownMenu && arrowIcon) {
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.toggle('active');
      arrowIcon.classList.toggle('fa-chevron-up', isOpen);
      arrowIcon.classList.toggle('fa-chevron-down', !isOpen);
    });
  }

  // 4. Close dropdown on link click
  if (dropdownMenu) {
    dropdownMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        dropdownMenu.classList.remove('active');
        if (arrowIcon) arrowIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        if (window.innerWidth <= 992 && navLinks && toggleIcon) {
          navLinks.classList.remove('show');
          toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      });
    });
  }

  // Close mobile nav when clicking any regular nav item
  if (navLinks) {
    navLinks.querySelectorAll('li:not(.dropdown) a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992 && toggleIcon) {
          navLinks.classList.remove('show');
          toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      });
    });
  }

  // 5. Close menus on clicking outside
  document.addEventListener('click', (e) => {
    if (moreBtn && dropdownMenu && !moreBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('active');
      if (arrowIcon) {
        arrowIcon.classList.remove('fa-chevron-up');
        arrowIcon.classList.add('fa-chevron-down');
      }
    }
    if (menuToggle && navLinks && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('show');
      if (toggleIcon) {
        toggleIcon.classList.remove('fa-xmark');
        toggleIcon.classList.add('fa-bars');
      }
    }
  });

  // 6. Projects View More / Show Less Toggle Logic (Class-based toggle)
  const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
  const viewMoreText = document.getElementById('viewMoreText');
  const viewMoreIcon = document.getElementById('viewMoreProjectsIcon');
  const hiddenProjects = document.querySelectorAll('.project-card.hidden-project');
  let isExpanded = false;

  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      isExpanded = !isExpanded;

      hiddenProjects.forEach((card) => {
        if (isExpanded) {
          card.classList.add('show-project');
        } else {
          card.classList.remove('show-project');
        }
      });

      if (isExpanded) {
        if (viewMoreText) viewMoreText.textContent = 'Show less';
        if (viewMoreIcon) viewMoreIcon.className = 'fa-solid fa-chevron-up';
      } else {
        if (viewMoreText) viewMoreText.textContent = 'View 3 more projects';
        if (viewMoreIcon) viewMoreIcon.className = 'fa-solid fa-chevron-down';
      }
    });
  }
});