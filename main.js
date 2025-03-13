document.addEventListener('DOMContentLoaded', () => {
  console.log("Attaching event listeners...");

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        console.log(`Scrolling to ${targetId}`);
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Close mobile navbar after click
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse?.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        console.log("Mobile menu closed.");
      }
    });
  });
});
