document.addEventListener('DOMContentLoaded', function () {
    // Portfolio Projects Data
    const portfolioProjects = [
        { 
            image: './Photos/prologsys.png', 
            name: 'Prolog Expert System', 
            type: 'College Project',
            description: 'Expert system that recommends treatments.',
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
                demo: 'https://itstsilv.github.io/Tsilv.github.io/index.html',
                github: 'https://github.com/ItsTsilv/Tsilv.github.io'
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

    const portfolioContainer = document.getElementById('portfolio-container');
    let currentIndex = 0;
    const projectsPerSet = 3;

    function createPortfolioCard(project) {
        return `
            <div class="portfolio-item">
                <div class="portfolio-image">
                    <img src="${project.image}" alt="${project.name}">
                </div>
                <div class="portfolio-content">
                    <h3>${project.name}</h3>
                    <p class="project-type">${project.type}</p>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.links.github}" class="project-link">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    function updatePortfolioProjects() {
        if (!portfolioContainer) return;

        const portfolioItems = portfolioContainer.querySelectorAll('.portfolio-item');
        
        // Add exit animation
        portfolioItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.1 * (index + 1)}s`;
            item.classList.remove('active');
            item.classList.add('exit');
        });

        setTimeout(() => {
            currentIndex = Math.floor(currentIndex / projectsPerSet) * projectsPerSet;

            let projectsToDisplay = [];
            for (let i = 0; i < projectsPerSet; i++) {
                projectsToDisplay.push(
                    portfolioProjects[(currentIndex + i) % portfolioProjects.length]
                );
            }

            portfolioContainer.innerHTML = projectsToDisplay
                .map(project => createPortfolioCard(project))
                .join('');

            requestAnimationFrame(() => {
                const newItems = portfolioContainer.querySelectorAll('.portfolio-item');
                newItems.forEach((item, index) => {
                    item.style.transitionDelay = `${0.1 * (index + 1)}s`;
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100);
                });
            });

            currentIndex = (currentIndex + projectsPerSet) % portfolioProjects.length;
        }, 500);
    }

    // Initialize portfolio rotation
    if (portfolioContainer) {
        updatePortfolioProjects();
        setInterval(updatePortfolioProjects, 5000);
    }

    // Scroll animations
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
});