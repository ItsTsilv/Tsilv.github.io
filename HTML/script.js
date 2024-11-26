document.addEventListener('DOMContentLoaded', function() {
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

    // =============== SKILL BARS ANIMATION ===============
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }

    const skillsSection = document.querySelector('.skills-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // =============== PERSONAL SKILLS CYCLING ===============
    const personalSkills = ["Computer Scientist", "Technology Specialist", "Hardware Enthusiast", "Skier", "Gamer", "Programmer", "Human :)"];
    let personalSkillIndex = 0;
    const skillElement = document.querySelector('.skill-cycle');

    function cyclePersonalSkills() {
        skillElement.classList.add('fade');
        
        setTimeout(() => {
            personalSkillIndex = (personalSkillIndex + 1) % personalSkills.length;
            skillElement.textContent = personalSkills[personalSkillIndex];
            skillElement.classList.remove('fade');
        }, 1500);
    }

    if (skillElement) {
        skillElement.textContent = personalSkills[0];
        setInterval(cyclePersonalSkills, 3000);
    }

    // =============== TECHNICAL SKILLS ROTATION ===============
    const technicalSkills = [
        { icon: 'fab fa-html5', name: 'HTML5', level: 100 },
        { icon: 'fab fa-css3-alt', name: 'CSS3', level: 100 },
        { icon: 'fab fa-js', name: 'JavaScript', level: 100 },
        { icon: 'fab fa-python', name: 'Python', level: 90 },
        { icon: 'fab fa-java', name: 'Java', level: 85 },
        { icon: 'fab fa-react', name: 'React', level: 80 },
        { icon: 'fab fa-node', name: 'Node.js', level: 85 },
        { icon: 'fas fa-database', name: 'SQL', level: 90 },
        { icon: 'fab fa-git-alt', name: 'Git', level: 95 },
        { icon: 'fab fa-aws', name: 'AWS', level: 75 },
        { icon: 'fas fa-mobile-alt', name: 'Mobile Dev', level: 80 },
        { icon: 'fas fa-server', name: 'Backend Dev', level: 85 }
    ];

    let technicalSkillIndex = 0;
    const skillsContainer = document.getElementById('skills-container');
    const numberOfSets = Math.ceil(technicalSkills.length / 3);

    function createSkillCard(skill) {
        return `
            <div class="skill-card">
                <i class="${skill.icon}"></i>
                <h3>${skill.name}</h3>
                <div class="skill-bar">
                    <div class="skill-level" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `;
    }

    function updateTechnicalSkills() {
        skillsContainer.classList.add('fade-out');
        
        setTimeout(() => {
            const startIndex = technicalSkillIndex * 3;
            const currentSkills = technicalSkills.slice(startIndex, startIndex + 3);
            
            skillsContainer.innerHTML = currentSkills
                .map(skill => createSkillCard(skill))
                .join('');
            
            skillsContainer.classList.remove('fade-out');
            skillsContainer.classList.add('fade-in');
            
            technicalSkillIndex = (technicalSkillIndex + 1) % numberOfSets;
        }, 500);
    }

    if (skillsContainer) {
        updateTechnicalSkills();
        setInterval(updateTechnicalSkills, 5000); // Changed to 5000ms (5 seconds)
    }

    // =============== CONTACT FORM ===============
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            this.classList.add('form-submitted');
            
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('Form submitted:', formObject);
            alert('Thank you for your message! I will get back to you soon.');
            
            this.reset();
            
            setTimeout(() => {
                this.classList.remove('form-submitted');
            }, 500);
        });
    }
});