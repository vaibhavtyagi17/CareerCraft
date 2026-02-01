// ===========================
// MAIN PAGE JAVASCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScroll();
    checkUserSession();
    initializeProtectedServices();
});

// ===========================
// NAVIGATION FUNCTIONS
// ===========================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for actual links
            if (this.href.includes('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ===========================
// SESSION MANAGEMENT
// ===========================

function checkUserSession() {
    const savedUser = localStorage.getItem('careercraft_user');
    const navbar = document.querySelector('.nav-menu');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        updateNavbarWithUser(user);
    }
}

function updateNavbarWithUser(user) {
    const loginBtn = document.querySelector('.login-btn');
    
    if (loginBtn && user.email) {
        loginBtn.textContent = `${user.email}`;
        loginBtn.href = '#';
        loginBtn.onclick = function(e) {
            e.preventDefault();
            logout();
        };
    }
}

function logout() {
    localStorage.removeItem('careercraft_user');
    localStorage.removeItem('careercraft_remember');
    window.location.reload();
}

// ===========================
// PROTECTED SERVICES AUTHENTICATION
// ===========================

function initializeProtectedServices() {
    const protectedLinks = document.querySelectorAll('.protected-service');
    
    protectedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const savedUser = localStorage.getItem('careercraft_user');
            
            if (!savedUser) {
                // User not logged in - show alert and redirect to login
                alert('You must be logged in to access this service. Please log in first.');
                window.location.href = 'login.html';
            } else {
                // User is logged in - open the service
                const serviceUrl = this.getAttribute('data-url');
                window.open(serviceUrl, '_blank');
            }
        });
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
