// Animation Utility Functions
const AnimationUtils = {
    // Fade in an element
    fadeIn: function(element, duration = 500, delay = 0) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, delay);
    },

    // Fade out an element
    fadeOut: function(element, duration = 500, delay = 0) {
        element.style.transition = `opacity ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '0';
        }, delay);
    },

    // Slide in from left
    slideInFromLeft: function(element, duration = 500, distance = 50) {
        element.style.opacity = '0';
        element.style.transform = `translateX(-${distance}px)`;
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    },

    // Slide in from right
    slideInFromRight: function(element, duration = 500, distance = 50) {
        element.style.opacity = '0';
        element.style.transform = `translateX(${distance}px)`;
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    },

    // Stagger animation for multiple elements
    staggerAnimation: function(elements, animationFunc, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                animationFunc(element);
            }, index * delay);
        });
    },

    // Scroll-triggered animation
    onScrollAnimation: function(elements, animationClass = 'active') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    },

    // Typing effect
    typeWriter: function(element, text, speed = 50) {
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        element.innerHTML = ''; // Clear existing content
        type();
    }
};

// Example usage (can be removed or commented out)
document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered animations
    const animateElements = document.querySelectorAll('.fade-in, .slide-in');
    AnimationUtils.onScrollAnimation(animateElements);

    // Optional: Stagger animations
    const skillCards = document.querySelectorAll('.skill-card');
    AnimationUtils.staggerAnimation(skillCards, (element) => {
        AnimationUtils.fadeIn(element);
    });
});