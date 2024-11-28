document.addEventListener('DOMContentLoaded', function () {
    console.log('Global script loaded');
    
    // =============== NAVIGATION FUNCTIONALITY ===============
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    // Set active page
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Change menu icon
            const menuIcon = mobileMenuButton.querySelector('.menu-icon');
            menuIcon.textContent = isMenuOpen ? '×' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuButton.contains(e.target) && isMenuOpen) {
                isMenuOpen = false;
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuButton.querySelector('.menu-icon').textContent = '☰';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenuButton.classList.remove('active');
                navLinks.classList.remove('active');
                mobileMenuButton.querySelector('.menu-icon').textContent = '☰';
            });
        });
    }

    // =============== PARTICLES.JS INITIALIZATION ===============
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // =============== SMOOTH SCROLLING ===============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============== SCROLL ANIMATIONS ===============
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

    document.querySelectorAll('.fade-in, .slide-in').forEach((element) => {
        observer.observe(element);
    });
});

// =============== PAGE LOAD ANIMATION ===============
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});