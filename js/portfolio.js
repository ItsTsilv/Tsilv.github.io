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

    // =============== TECHNICAL SKILLS ROTATION ===============
    const technicalSkills = [
        { 
            image: './Photos/prologsys.png', 
            name: 'Prolog Expert System', 
            type: 'College Project',
            description:  'Expert system that recommends treatments.',
            technologies: ['Prolog', 'Perl', 'SWI'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        { 
            image: './Photos/websitepic.png', 
            name: 'Trevor Silverman', 
            type: 'Personal Website',
            description: 'The website being used right now!',
            technologies: ['HTML', 'CSS', 'Javascript'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        { 
            image: './Photos/tftgame.png', 
            name: 'TFT style battle game', 
            type: 'Mobile App',
            description: 'A cross-platform auto battler.',
            technologies: ['C#', 'C', 'Blender'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        { 
            image: './Photos/tamadapic.png', 
            name: 'Tamada Decentrium', 
            type: 'College Group project',
            description: 'Tamagachi based College Project.',
            technologies: ['MongoDB', 'C#', 'NRS-projects'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        { 
            image: './Photos/tamadalogin.png', 
            name: 'Hosted Login and DB', 
            type: 'Mongo DB',
            description: 'Web login with Mongo DB storage.',
            technologies: ['HTML', 'MongoDB', 'CSS'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        { 
            image: './Photos/Sketchup.png', 
            name: 'Sketchup House', 
            type: 'House design',
            description: 'Highschool house design project.',
            technologies: ['Sketchup', 'Revit', '3D-Printing'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        { 
            image: './Photos/woodzee.png', 
            name: 'Solidworks Glasses', 
            type: 'Woodzee glasses',
            description: 'Highschool internship at Woodzee.',
            technologies: ['Solidworks', '3D-printing', 'AutoCAD'],
            links: {
                demo: '#',
                github: '#'
            }
        },
    ];

    const skillsContainer = document.getElementById('skills-container');
    let currentIndex = 0;
    const skillsPerSet = 3;

    function createSkillCard(skill) {
        return `
            <div class="skill-card">
                <img src="${skill.image}" alt="${skill.name}" class="project-image">
                <h3>${skill.name}</h3>
                <p>${skill.type}</p>
                <div class="timeline">
                    <div class="timeline-content">
                        <p>${skill.description}</p>
                        <div class="skills-grid">
                            ${skill.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${skill.links.demo}" class="skill-tag"><i class="fas fa-link"></i> Live Demo</a>
                            <a href="${skill.links.github}" class="skill-tag"><i class="fab fa-github"></i> GitHub</a>
                        </div>
                    </div>
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
});