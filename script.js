// Hello World Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const helloText = document.querySelector('.hello-text');
    const subtitle = document.querySelector('.subtitle');
    const container = document.querySelector('.container');
    
    // Error handling for missing elements
    if (!helloText || !subtitle || !container) {
        console.warn('Some DOM elements not found. Interactive features may not work properly.');
        return;
    }

    // Add interactive click effect to hello text
    helloText.addEventListener('click', function() {
        // Create ripple effect
        createRippleEffect(this, event);
        
        // Change text temporarily
        const originalText = this.textContent;
        const messages = ['Hello World!', 'Bonjour Monde!', 'Hola Mundo!', '¡Hola Mundo!', 'Ciao Mondo!'];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        this.textContent = randomMessage;
        this.style.transform = 'scale(1.05)';
        
        // Reset after animation
        setTimeout(() => {
            this.textContent = originalText;
            this.style.transform = 'scale(1)';
        }, 1500);
    });

    // Add hover effect to subtitle
    subtitle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.color = '#4CAF50';
    });

    subtitle.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.color = '#666';
    });

    // Create floating particles animation
    function createFloatingParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createParticle();
            }, i * 200);
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #4CAF50, #2196F3);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.7;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            z-index: -1;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 7000);
    }

    // Create ripple effect function
    function createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(76, 175, 80, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(90deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            75% { transform: translateY(-10px) rotate(270deg); }
        }
        
        @keyframes ripple {
            0% { transform: scale(0); opacity: 0.6; }
            100% { transform: scale(2); opacity: 0; }
        }
        
        .hello-text {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            user-select: none;
        }
        
        .subtitle {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: default;
        }
        
        .container {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Initialize floating particles
    createFloatingParticles();
    
    // Recreate particles periodically
    setInterval(createFloatingParticles, 10000);

    // Add keyboard accessibility
    helloText.setAttribute('tabindex', '0');
    helloText.setAttribute('role', 'button');
    helloText.setAttribute('aria-label', 'Click to see Hello World in different languages');
    
    helloText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });

    // Add focus styles for accessibility
    helloText.addEventListener('focus', function() {
        this.style.outline = '2px solid #4CAF50';
        this.style.outlineOffset = '4px';
    });
    
    helloText.addEventListener('blur', function() {
        this.style.outline = 'none';
    });

    // Performance optimization: throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any position-dependent features if needed
            console.log('Window resized, recalculating positions...');
        }, 250);
    });

    // Add smooth scroll behavior for any future navigation
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('Hello World interactive features loaded successfully! 🌟');
});