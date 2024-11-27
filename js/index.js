document.addEventListener('DOMContentLoaded', function () {
    // =============== SCROLL ANIMATIONS ===============
    const animateElements = document.querySelectorAll('.fade-in, .slide-in');

    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.8) {
                element.classList.add('active');
            }
        });
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // =============== SKILL CARDS ANIMATION ===============
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');
    let hasAnimated = false;

    const animateSkillCards = () => {
        if (hasAnimated) return;

        skillCards.forEach((card, index) => {
            // Set individual delays based on index
            card.style.transitionDelay = `${0.1 * (index + 1)}s`;
            
            // Trigger the animation
            setTimeout(() => {
                card.classList.add('active');
            }, 100);
        });

        hasAnimated = true;
    };

    // Intersection Observer to trigger animation when skills section is in view
    const skillsSection = document.querySelector('.skills-section');
    const skillCardsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateSkillCards();
                skillCardsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the section is visible
    });

    // Observe the skills section
    if (skillsSection) {
        skillCardsObserver.observe(skillsSection);
    }

    // =============== SKILL BARS ANIMATION ===============
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            // Set individual delays based on index
            bar.style.transitionDelay = `${0.1 * (index + 1)}s`;
            
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }

    const skillBarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillBarsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the section is visible
    });

    if (skillsSection) {
        skillBarsObserver.observe(skillsSection);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    
    // Social Links Hover Effects
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});