/* =========================================
   FAREWELL WEBSITE - VANILLA JAVASCRIPT
   Premium Mobile-First Experience
   ========================================= */

// =========================================
// SMOOTH SCROLL FUNCTIONS
// =========================================

/**
 * Smoothly scroll to the memories section
 */
function scrollToMemories() {
    const memoriesSection = document.getElementById('memories');
    if (memoriesSection) {
        memoriesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Smoothly scroll back to the top of the page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// =========================================
// SCROLL ANIMATIONS
// =========================================

/**
 * Initialize Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-fade');
    
    // Observer options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation triggers
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements
    scrollElements.forEach((element) => {
        scrollObserver.observe(element);
    });
}

// =========================================
// LAZY LOADING IMAGES
// =========================================

/**
 * Initialize lazy loading for images
 * Modern browsers support native lazy loading via loading="lazy" attribute
 * This function provides a fallback for older browsers
 */
function initLazyLoading() {
    // Check if native lazy loading is supported
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported, no need for custom implementation
        return;
    }
    
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach((img) => {
        imageObserver.observe(img);
    });
}

// =========================================
// PERFORMANCE OPTIMIZATIONS
// =========================================

/**
 * Add performance hints for faster rendering
 */
function optimizePerformance() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap';
    
    // Add connection hints for external resources
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.gstatic.com';
    preconnect.crossOrigin = 'anonymous';
}

// =========================================
// PROGRESSIVE WEB APP
// =========================================

/**
 * Register Service Worker for offline functionality
 * Note: Service Worker will be created if needed for production
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        // Service worker registration would go here
        // For this simple site, we'll skip it to keep things minimal
        // Uncomment below if you want offline functionality:
        
        /*
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
        */
    }
}

// =========================================
// TOUCH GESTURES (Mobile Enhancement)
// =========================================

/**
 * Enhance touch interactions on mobile devices
 */
function initTouchEnhancements() {
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach((button) => {
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            button.click();
        }, { passive: false });
    });
    
    // Add subtle haptic feedback for buttons (if supported)
    if ('vibrate' in navigator) {
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                navigator.vibrate(10); // 10ms subtle vibration
            });
        });
    }
}

// =========================================
// VIEWPORT HEIGHT FIX (Mobile Browsers)
// =========================================

/**
 * Fix viewport height issues on mobile browsers
 * Mobile browsers have dynamic address bars that affect vh units
 */
function fixMobileViewportHeight() {
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
}

// =========================================
// ANALYTICS & TRACKING (Optional)
// =========================================

/**
 * Track user interactions for insights
 * This is a placeholder - implement only if needed
 */
function trackInteraction(action, label) {
    // Placeholder for analytics
    // console.log('Track:', action, label);
}

// =========================================
// ACCESSIBILITY ENHANCEMENTS
// =========================================

/**
 * Enhance accessibility features
 */
function initAccessibility() {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Space or Enter on buttons
        if (e.key === ' ' || e.key === 'Enter') {
            if (e.target.tagName === 'BUTTON') {
                e.preventDefault();
                e.target.click();
            }
        }
    });
    
    // Add focus visible styles for keyboard navigation
    document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
    });
    
    document.body.addEventListener('keydown', () => {
        document.body.classList.remove('using-mouse');
    });
}

// =========================================
// LOADING STATE
// =========================================

/**
 * Handle page load state
 */
function handlePageLoad() {
    // Ensure fonts are loaded before displaying content
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
    
    // Hide loading indicator (if any)
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
    });
}

// =========================================
// INITIALIZE EVERYTHING
// =========================================

/**
 * Main initialization function
 * Runs when DOM is fully loaded
 */
function init() {
    // Core functionality
    initScrollAnimations();
    initLazyLoading();
    
    // Mobile enhancements
    fixMobileViewportHeight();
    initTouchEnhancements();
    
    // Performance & PWA
    optimizePerformance();
    registerServiceWorker();
    
    // Accessibility
    initAccessibility();
    
    // Loading state
    handlePageLoad();
    
    // Track page view
    trackInteraction('page_view', 'hero');
}

// =========================================
// RUN ON DOM CONTENT LOADED
// =========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already loaded
    init();
}

// =========================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// =========================================

// These functions are called from HTML onclick attributes
window.scrollToMemories = scrollToMemories;
window.scrollToTop = scrollToTop;
