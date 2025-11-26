// SwapMart Site JavaScript
// Handles navigation, smooth scrolling, animations, and interactivity

// ===== MOBILE NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translateY(8px)' 
                : 'rotate(0) translateY(0)';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translateY(-8px)' 
                : 'rotate(0) translateY(0)';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'rotate(0) translateY(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translateY(0)';
            }
        });
    });
}

// ===== SMOOTH SCROLL WITH OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.card, .variant-card, .feature-card, .feature-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.style.color = 'var(--primary)';
            navLink.style.background = 'var(--off-white)';
        } else if (navLink) {
            navLink.style.color = 'var(--dark)';
            navLink.style.background = 'transparent';
        }
    });
}

window.addEventListener('scroll', debounce(highlightNavigation, 10));

// ===== VARIANT CARD HOVER EFFECT =====
const variantCards = document.querySelectorAll('.variant-card');
variantCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== TABLE ROW HIGHLIGHT ON MOBILE =====
if (window.innerWidth <= 768) {
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            tableRows.forEach(r => r.style.background = '');
            this.style.background = 'rgba(0, 102, 204, 0.1)';
        });
    });
}

// ===== IMAGE LOADING STATE =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// ===== UTILITY: DEBOUNCE FUNCTION =====
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== PRINT OPTIMIZATION =====
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.nav-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.nav-menu').forEach(menu => {
        menu.style.display = '';
    });
});

// ===== COPY TO CLIPBOARD FOR DETAILS =====
const detailValues = document.querySelectorAll('.detail-value');
detailValues.forEach(detail => {
    detail.style.cursor = 'pointer';
    detail.title = 'Click to copy';
    
    detail.addEventListener('click', function() {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.style.color = 'var(--primary)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 1000);
        }).catch(err => {
            console.log('Copy failed:', err);
        });
    });
});

// ===== HOVER EFFECT FOR TECH TAGS =====
const techTags = document.querySelectorAll('.tech-tag, .tech-item');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== CATEGORY COLOR INDICATORS =====
function addCategoryColors() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const icon = card.querySelector('.card-icon');
        if (icon) {
            const colors = [
                'var(--primary)',     // First card - primary
                'var(--secondary)',   // Second card - secondary
                'var(--accent)',      // Third card - accent
                'var(--primary-dark)' // Fourth card - primary-dark
            ];
            if (colors[index]) {
                icon.style.color = colors[index];
            }
        }
    });
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 999;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(20px)';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    addCategoryColors();
    createScrollToTop();
    
    // Add smooth reveal to hero stats
    const heroStats = document.querySelectorAll('.stat-item');
    heroStats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        setTimeout(() => {
            stat.style.transition = 'all 0.5s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
    
    console.log('%c🔄 SwapMart', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #0066CC 0%, #00A86B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cTechnical Execution Plan', 'font-size: 14px; color: #6B6B6B;');
    console.log('%cYour Trusted Second-Hand Marketplace', 'font-size: 12px; font-style: italic; color: #0066CC;');
});

// ===== PERFORMANCE MONITORING =====
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
                console.log(`Page load time: ${entry.loadEventEnd - entry.fetchStart}ms`);
            }
        }
    });
    
    perfObserver.observe({ entryTypes: ['navigation'] });
}
