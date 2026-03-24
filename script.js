// Language management
let currentLanguage = 'en';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    setupLanguageSwitcher();
    setupFormSubmission();
    setupSmoothScroll();
});

// Initialize language
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    updateLanguage(currentLanguage);
}

// Setup language switcher buttons
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            currentLanguage = lang;
            localStorage.setItem('selectedLanguage', lang);
            updateLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Set active button on load
    document.querySelector(`[data-lang="${currentLanguage}"]`).classList.add('active');
}

// Update all text elements
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Setup form submission
function setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Simulate form submission
            console.log('Form submitted:', formData);
            
            // Show success message
            alert(currentLanguage === 'en' ? 'Thank you! Your message has been sent.' : 
                  currentLanguage === 'es' ? '¡Gracias! Tu mensaje ha sido enviado.' :
                  currentLanguage === 'fr' ? 'Merci! Votre message a été envoyé.' :
                  'Danke! Ihre Nachricht wurde gesendet.');
            
            // Reset form
            this.reset();
        });
    }
}

// Setup smooth scroll for navigation
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Add scroll animation for elements
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.skill-card, .project-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations on page load
setTimeout(observeElements, 100);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        navigateToPreviousSection();
    } else if (e.key === 'ArrowRight') {
        navigateToNextSection();
    }
});

function navigateToPreviousSection() {
    const sections = Array.from(document.querySelectorAll('section'));
    const current = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= window.innerHeight;
    });
    
    if (current) {
        const currentIndex = sections.indexOf(current);
        if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function navigateToNextSection() {
    const sections = Array.from(document.querySelectorAll('section'));
    const current = sections.find(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= window.innerHeight;
    });
    
    if (current) {
        const currentIndex = sections.indexOf(current);
        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Add scroll to top button functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for navbar styling on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
