document.addEventListener('DOMContentLoaded', function () {
    // =============== PERSONAL SKILLS CYCLING ===============
    const personalSkills = [
        "Computer Scientist", 
        "Technology Specialist", 
        "Hardware Enthusiast",
        "Programmer", 
        "Data Analyst",
        "Cybersecurity Expert",
        "Machine Learning Engineer",
        "AI Researcher",
        "DevOps Engineer",
        "Network Administrator",
        "Software Developer",
        "Web Designer",
        "Digital Marketer",
        "Blockchain Enthusiast",
        "Software Architect",
        "Artificial Intelligence Specialist",
        "Mobile App Developer",
        "Systems Integrator",
        "Database Administrator",
        "Skier", 
        "Gamer", 
        "Human :)"
    ];
    let personalSkillIndex = 0;
    const skillElement = document.querySelector('.skill-cycle');

    function cyclePersonalSkills() {
        if (skillElement) {
            // Fade out effect
            skillElement.style.opacity = '0';
            
            setTimeout(() => {
                // Update skill
                personalSkillIndex = (personalSkillIndex + 1) % personalSkills.length;
                skillElement.textContent = personalSkills[personalSkillIndex];
                
                // Fade in effect
                skillElement.style.opacity = '1';
            }, 500);
        }
    }

    // Start skill cycling if element exists
    if (skillElement) {
        // Initial text
        skillElement.textContent = personalSkills[0];
        
        // Cycle skills every 3 seconds
        setInterval(cyclePersonalSkills, 3000);
    }

    // =============== TECHNICAL SKILLS ROTATION ===============
    const technicalSkills = [
        { icon: 'fab fa-html5', name: 'HTML5', level: 100 },
        { icon: 'fab fa-css3-alt', name: 'CSS3', level: 100 },
        { icon: 'fab fa-js', name: 'JavaScript', level: 100 },
        { icon: 'fab fa-python', name: 'Python', level: 100 },
        { icon: 'fas fa-brain', name: 'Prolog', level: 100 }, 
        { icon: 'fas fa-code', name: 'Perl', level: 100 },
        { icon: 'fab fa-gem', name: 'Ruby', level: 100 },
        { icon: 'fab fa-node-js', name: 'Node.js', level: 100 },
        { icon: 'fas fa-database', name: 'SQL', level: 100 },
        { icon: 'fab fa-git-alt', name: 'Git', level: 100 },
        { icon: 'fas fa-gem', name: 'Ruby on Rails', level: 100 },
        { icon: 'fas fa-cogs', name: 'Solidworks', level: 100 },
        { icon: 'fas fa-drafting-compass', name: 'AutoCAD', level: 100 },
        { icon: 'fas fa-cube', name: 'Sketchup', level: 100 },
        { icon: 'fas fa-print', name: '3D Printing', level: 100 }
    ];

    const skillsContainer = document.querySelector('.skills-grid');
    let currentIndex = 0;
    const skillsPerSet = 3;

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
        if (!skillsContainer) return;

        const skillCards = skillsContainer.querySelectorAll('.skill-card');
        
        // Add exit animation
        skillCards.forEach((card, index) => {
            // Modify the exit animation to match the previous movement
            card.style.transitionDelay = `${0.1 * (index + 1)}s`;
            card.classList.remove('active');
            card.classList.add('exit');
        });

        setTimeout(() => {
            // Ensure we always start from a multiple of 3
            currentIndex = Math.floor(currentIndex / skillsPerSet) * skillsPerSet;

            // Get next set of skills
            let skillsToDisplay = [];
            
            // Collect the next 3 skills, wrapping around if needed
            for (let i = 0; i < skillsPerSet; i++) {
                skillsToDisplay.push(
                    technicalSkills[(currentIndex + i) % technicalSkills.length]
                );
            }

            // Update DOM
            skillsContainer.innerHTML = skillsToDisplay
                .map(skill => createSkillCard(skill))
                .join('');

            // Trigger entrance animation with staggered delay
            requestAnimationFrame(() => {
                const newCards = skillsContainer.querySelectorAll('.skill-card');
                newCards.forEach((card, index) => {
                    // Add staggered transition delay
                    card.style.transitionDelay = `${0.1 * (index + 1)}s`;
                    
                    // Trigger the animation
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 100);
                });
            });

            // Update index
            currentIndex = (currentIndex + skillsPerSet) % technicalSkills.length;
        }, 500);
    }

    // Initialize skills rotation
    if (skillsContainer) {
        updateTechnicalSkills(); // Initial render
        setInterval(updateTechnicalSkills, 5000); // Rotate every 5 seconds
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

    // Intersection Observer for skill bars
    const skillsSection = document.querySelector('.skills-section');
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

    // Observe the skills section
    if (skillsSection) {
        skillBarsObserver.observe(skillsSection);
    }

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

    // Initial check and scroll event listener
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});