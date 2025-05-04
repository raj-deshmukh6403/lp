document.addEventListener("DOMContentLoaded", function () {
  // Page Navigation
  const navLinks = document.querySelectorAll(".nav-links a, .nav-tile, .logo");
  const pages = document.querySelectorAll(".page");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetPage = this.getAttribute("data-page");

      // Update active page
      pages.forEach((page) => {
        page.classList.remove("active");
        if (page.id === targetPage) {
          page.classList.add("active");
        }
      });

      // Update active nav link
      document.querySelectorAll(".nav-links a").forEach((navLink) => {
        navLink.classList.remove("active");
        if (navLink.getAttribute("data-page") === targetPage) {
          navLink.classList.add("active");
        }
      });

      // Close mobile menu if open
      document.querySelector(".nav-links").classList.remove("show");
      document.querySelector(".mobile-menu-overlay").classList.remove("show");

      // Scroll to top
      window.scrollTo(0, 0);
    });
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

  mobileMenuBtn.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("show");
    mobileMenuOverlay.classList.toggle("show");
  });

  mobileMenuOverlay.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.remove("show");
    this.classList.remove("show");
  });

  // Form Submission
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Here you would typically send the form data to a server
    // For demonstration, we'll just log it and show an alert
    console.log("Form submitted:", { name, email, message });

    alert("Thank you for your message! I will get back to you soon.");

    // Reset the form
    contactForm.reset();
  });
});
