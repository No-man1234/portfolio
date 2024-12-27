// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Function to animate knowledge bars
function animateKnowledgeBars() {
    const knowledgeBars = document.querySelectorAll('.knowledge-bar');
    
    knowledgeBars.forEach(bar => {
        // Reset width to 0
        bar.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the progress value
                    const progress = bar.getAttribute('data-progress');
                    
                    // Add a slight delay before starting the animation
                    setTimeout(() => {
                        // Animate to the target width
                        bar.style.width = `${progress}%`;
                    }, 200);
                    
                    // Stop observing after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Start observing the bar's container
        observer.observe(bar.parentElement);
    });
}

// Make sure this runs when the page loads
document.addEventListener('DOMContentLoaded', animateKnowledgeBars);

// Also run it when the window loads (for safety)
window.addEventListener('load', animateKnowledgeBars);

// Typing Effect
const typed = new Typed('#typed-text', {
    strings: [
        'Software Developer',
        'Problem Solver',
        'Tech Enthusiast',
        'UIU Student'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    loop: true
});

// Scroll Progress Bar
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / height) * 100;
        progress.style.width = `${scrolled}%`;
    });
};

// 3D Card Effect
const initializeCards = () => {
    document.querySelectorAll('.project-card').forEach(card => {
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
};

// Magnetic Buttons
const initializeMagneticButtons = () => {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x/5}px, ${y/5}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
};

// Skills Progress Animation
const animateSkills = () => {
    gsap.utils.toArray('.skill-bar').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top center+=100'
            },
            '--progress': `${progress}%`,
            duration: 1.5,
            ease: 'power2.out'
        });
    });
};

// Loading Animation
window.addEventListener('load', () => {
    gsap.to('.loading', {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            document.querySelector('.loading').style.display = 'none';
            
            // Animate header content
            gsap.from('.header-content', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out'
            });
            
            // Initialize other features
            createScrollProgress();
            initializeCards();
            initializeMagneticButtons();
            animateSkills();
            animateKnowledgeBars();
            
            // Initialize VanillaTilt for profile picture
            if (document.querySelector('.profile-image-container')) {
                VanillaTilt.init(document.querySelector('.profile-image-container'), {
                    max: 25,
                    speed: 400,
                    glare: true,
                    'max-glare': 0.5
                });
            }
        }
    });
});

// Smooth Scroll with Progress Indicator
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const section = document.querySelector(anchor.getAttribute('href'));
        
        window.scrollTo({
            behavior: 'smooth',
            top: section.offsetTop - 100
        });
    });
});
// get in touch message form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    const buttonLoader = document.getElementById('buttonLoader');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Disable button and show loader
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline';
        
        try {
            // Replace 'your-form-id' with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/mnnnnzdy', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                successMessage.style.display = 'block';
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            // Show error message
            errorMessage.style.display = 'block';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        } finally {
            // Re-enable button and hide loader
            submitButton.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoader.style.display = 'none';
        }
    });
});
// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Initialize Intersection Observer for Section Animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate child elements
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, i) => {
                gsap.from(el, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.2
                });
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Handle Navigation State
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateKnowledgeBars();
});