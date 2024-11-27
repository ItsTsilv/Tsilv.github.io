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

    // =============== CONTACT FORM SUBMISSION ===============
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');

    // Ensure the form has the correct Formspree endpoint
    contactForm.action = 'https://formspree.io/f/xanypdop';

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Reset previous status messages
        formStatus.style.display = 'none';
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        // Add form submission animation
        this.classList.add('form-submitted');

        // Collect form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');

        // Validate form inputs
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();

        // Validation checks
        if (name.length < 2) {
            displayError('Please enter a valid name.');
            return;
        }

        if (!validateEmail(email)) {
            displayError('Please enter a valid email address.');
            return;
        }

        if (message.length < 10) {
            displayError('Message must be at least 10 characters long.');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Actual form submission using Fetch API
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                formStatus.style.display = 'block';
                successMessage.style.display = 'block';
                
                // Reset form
                this.reset();

                // Optional: Scroll to top of form or show success message
                this.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show error message
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Display error message
            displayError('Unable to send message. Please try again later.');
            console.error('Submission error:', error);
        })
        .finally(() => {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

            // Remove submission animation
            this.classList.remove('form-submitted');
        });
    });

    // Helper function to display error messages
    function displayError(message) {
        formStatus.style.display = 'block';
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Remove form submitted class
        contactForm.classList.remove('form-submitted');
    }

    // Optional: Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            // Clear previous error states
            this.classList.remove('input-error');
        });
    });

    emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value.trim())) {
            this.classList.add('input-error');
        }
    });
});