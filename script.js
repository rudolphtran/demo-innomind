// ==========================================
// Code Up Your Brain - JavaScript
// Language Toggle & Interactions
// ==========================================

// Language State
let currentLang = 'en'; // Default language

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language from localStorage or default to English
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    
    // Language Toggle Button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Initialize Contact Modal
    initContactModal();
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animation
    observeElements();
});

// Language Toggle Function
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    setLanguage(currentLang);
    localStorage.setItem('language', currentLang);
}

// Set Language Function
function setLanguage(lang) {
    currentLang = lang;
    
    // Update language indicator
    const langButton = document.getElementById('currentLang');
    if (langButton) {
        langButton.textContent = lang.toUpperCase();
    }
    
    // Update all elements with data-en and data-vi attributes
    const elements = document.querySelectorAll('[data-en][data-vi]');
    
    elements.forEach(element => {
        const enText = element.getAttribute('data-en');
        const viText = element.getAttribute('data-vi');
        
        if (enText && viText) {
            // Check if it's an input element
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = lang === 'en' ? enText : viText;
            } 
            // Check if it's an option element
            else if (element.tagName === 'OPTION') {
                element.textContent = lang === 'en' ? enText : viText;
            }
            // For all other elements
            else {
                element.textContent = lang === 'en' ? enText : viText;
            }
        }
    });
}

// Contact Form Submit Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    const formSuccess = document.getElementById('formSuccess');
    const contactForm = document.getElementById('contactForm');
    
    if (formSuccess && contactForm) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 5000);
    }
}

// Intersection Observer for scroll animations
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
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.highlight-card, .module-card, .timeline-item, .expertise-card, .faq-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Add active state to navigation based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on load
setActiveNavLink();

// Prevent form resubmission on page reload
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // ESC key to close contact modal
        const modal = document.getElementById('contactModal');
        if (modal && modal.classList.contains('active')) {
            closeContactModal();
        }
    }
});

// Smooth scroll to top button (optional enhancement)
let scrollToTopBtn = null;

function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #FF0000;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    `;
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#CC0000';
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#FF0000';
        this.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(scrollToTopBtn);
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (!scrollToTopBtn) {
        createScrollToTopButton();
    }
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Check if image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Print friendly styles
window.addEventListener('beforeprint', function() {
    // Hide unnecessary elements when printing
    const hideOnPrint = document.querySelectorAll('.lang-toggle, .mobile-menu-toggle, .scroll-to-top');
    hideOnPrint.forEach(element => {
        element.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const hideOnPrint = document.querySelectorAll('.lang-toggle, .mobile-menu-toggle');
    hideOnPrint.forEach(element => {
        element.style.display = '';
    });
});

// Analytics placeholder (replace with your actual analytics code)
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // Example: gtag('event', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_url: e.target.href || 'N/A'
        });
    }
});

// Contact Modal Functions
function initContactModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('contactModal')) {
        createContactModal();
    }
    
    // Add event listeners to all contact links
    const contactLinks = document.querySelectorAll('a[href="contact.html"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal();
        });
    });
}

function createContactModal() {
    const modal = document.createElement('div');
    modal.id = 'contactModal';
    modal.className = 'contact-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 data-en="Contact Us" data-vi="Liên hệ với chúng tôi">Contact Us</h2>
                <button class="modal-close" onclick="closeContactModal()" aria-label="Close">&times;</button>
            </div>
            <div class="modal-body">
                <p data-en="Get in touch with us through any of these channels:" data-vi="Liên hệ với chúng tôi qua các kênh sau:">Get in touch with us through any of these channels:</p>
                
                <div class="modal-contact-methods">
                    <a href="mailto:contact@codeupyourbrain.com" class="modal-contact-item">
                        <div class="modal-contact-icon">📧</div>
                        <div class="modal-contact-details">
                            <h3 data-en="Email" data-vi="Email">Email</h3>
                            <p>contact@codeupyourbrain.com</p>
                        </div>
                    </a>
                    
                    <a href="tel:+84123456789" class="modal-contact-item">
                        <div class="modal-contact-icon">📱</div>
                        <div class="modal-contact-details">
                            <h3 data-en="Phone" data-vi="Điện thoại">Phone</h3>
                            <p>+84 123 456 789</p>
                        </div>
                    </a>
                    
                    <a href="https://www.facebook.com/codeupyourbrain" target="_blank" class="modal-contact-item">
                        <div class="modal-contact-icon">👥</div>
                        <div class="modal-contact-details">
                            <h3 data-en="Facebook" data-vi="Facebook">Facebook</h3>
                            <p>@codeupyourbrain</p>
                        </div>
                    </a>
                    
                    <div class="modal-contact-item" style="cursor: default;">
                        <div class="modal-contact-icon">🏢</div>
                        <div class="modal-contact-details">
                            <h3 data-en="InnoMind Academy" data-vi="Học viện InnoMind">InnoMind Academy</h3>
                            <p data-en="Da Nang, Vietnam" data-vi="Đà Nẵng, Việt Nam">Da Nang, Vietnam</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <p data-en="We look forward to hearing from you!" data-vi="Chúng tôi mong được nghe từ bạn!">We look forward to hearing from you!</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeContactModal();
        }
    });
    
    // Update modal text based on current language
    setLanguage(currentLang);
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track event
        trackEvent('contact_modal_opened', {});
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make closeContactModal available globally
window.closeContactModal = closeContactModal;

// Accessibility enhancements
// Add skip to main content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = currentLang === 'en' ? 'Skip to main content' : 'Chuyển đến nội dung chính';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #FF0000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add skip link on load
addSkipLink();

// Console message for developers
console.log('%cCode Up Your Brain', 'color: #FF0000; font-size: 24px; font-weight: bold;');
console.log('%cWebsite built with ❤️ by InnoMind Academy', 'color: #666; font-size: 12px;');
console.log('%cInterested in learning to code? Visit us at contact@codeupyourbrain.com', 'color: #FF0000; font-size: 14px;');
