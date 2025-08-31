// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
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

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add smooth scrolling for anchor links
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

    // Add click analytics tracking (placeholder for Google Analytics or similar)
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Link clicked:', this.href);
            // Example: gtag('event', 'click', { 'event_category': 'link', 'event_label': this.href });
            
            // Add slight delay for external links to ensure tracking
            if (this.hostname !== window.location.hostname && this.target === '_blank') {
                e.preventDefault();
                setTimeout(() => {
                    window.open(this.href, '_blank');
                }, 100);
            }
        });
    });

    // Add typing effect to the main title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Uncomment to add typing effect to your name
    // const nameElement = document.querySelector('.header h1');
    // if (nameElement) {
    //     const originalText = nameElement.textContent;
    //     typeWriter(nameElement, originalText, 150);
    // }

    // Add parallax effect to background (subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.1;
        
        parallax.style.backgroundPosition = `center ${speed}px`;
    });

    // Form validation (if you add a contact form later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add dark mode toggle functionality (optional)
    function initDarkMode() {
        const toggleButton = document.getElementById('dark-mode-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Load saved preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    initDarkMode();

    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Add copy email functionality
    function addCopyEmailFunction() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                const email = this.href.replace('mailto:', '');
                navigator.clipboard.writeText(email).then(() => {
                    // Show copied notification
                    showNotification('Email copied to clipboard!');
                });
            });
        });
    }

    // Show notification function
    function showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after duration
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }

    addCopyEmailFunction();

    console.log('Portfolio website loaded successfully! 🚀');
});