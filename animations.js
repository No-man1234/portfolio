// Initialize GSAP only if it's available
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Function to animate knowledge bars - critical functionality
function animateKnowledgeBars() {
    const knowledgeBars = document.querySelectorAll('.knowledge-bar');
    
    knowledgeBars.forEach(bar => {
        // Get the progress value immediately
        const progress = bar.getAttribute('data-progress');
        
        // Set initial width to 0
        bar.style.width = '0%';
        
        // Use simple intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate to the target width after a short delay
                    setTimeout(() => {
                        bar.style.width = `${progress}%`;
                    }, 100);
                    
                    // Stop observing after animation starts
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Start observing the bar's container
        observer.observe(bar.parentElement);
    });
}

// Simpler scroll handling for nav
function handleNavScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Simplified section visibility handler
function setupSectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Form handler - critical functionality
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    const buttonLoader = document.getElementById('buttonLoader');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline';

        const formData = new FormData(form);

        fetch('https://formspree.io/f/mnnnnzdy', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit');
                }
                return response.json();
            })
            .then(data => {
                if (data.ok) {
                    successMessage.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.style.display = 'block';
            })
            .finally(() => {
                submitButton.disabled = false;
                buttonText.style.display = 'inline';
                buttonLoader.style.display = 'none';
            });
    });
}

// Smooth scroll for navigation - essential for UX
function setupSmoothScroll() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Initialize 3D card effect - but only after main content loads
function initializeCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = -(x - centerX) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Important: Improve loading sequence
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen as soon as DOM is ready
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 300); // Short timeout to ensure the page has rendered
    
    // Run critical functions immediately
    handleNavScroll();
    setupSectionObserver();
    setupSmoothScroll();
    setupContactForm();
    animateKnowledgeBars();
    
    // Defer non-critical animations
    setTimeout(() => {
        if (typeof VanillaTilt !== 'undefined' && document.querySelector('.profile-image-container')) {
            VanillaTilt.init(document.querySelector('.profile-image-container'), {
                max: 25,
                speed: 400,
                glare: true,
                'max-glare': 0.5
            });
        }
        
        initializeCards();
    }, 1000);
});

// Add scroll listener for navbar - needs to run on scroll
window.addEventListener('scroll', handleNavScroll);