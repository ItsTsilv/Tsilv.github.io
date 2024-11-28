document.addEventListener('DOMContentLoaded', function () {
    console.log('Global script loaded');
    
    // Basic navigation active state
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections with animations
    document.querySelectorAll('.fade-in, .slide-in').forEach((element) => {
        observer.observe(element);
    });
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});