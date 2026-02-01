// ===========================
// LOGIN PAGE JAVASCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    checkRememberedUser();
});

// ===========================
// TOGGLE PASSWORD VISIBILITY
// ===========================

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// ===========================
// LOGIN HANDLER
// ===========================

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const messageDiv = document.getElementById('loginMessage');
    
    // Validation
    if (!email || !password) {
        showMessage(messageDiv, 'Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.auth-button');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Signing in...';
    loginBtn.disabled = true;
    
    try {
        // Call backend API
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store user data
            const userData = {
                email: email,
                id: data.userId,
                token: data.token
            };
            
            localStorage.setItem('careercraft_user', JSON.stringify(userData));
            
            // Handle Remember Me
            if (rememberMe) {
                localStorage.setItem('careercraft_remember', JSON.stringify({
                    email: email,
                    timestamp: Date.now()
                }));
                // Note: We don't store password for security reasons
            } else {
                localStorage.removeItem('careercraft_remember');
            }
            
            showMessage(messageDiv, 'Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage(messageDiv, data.message || 'Login failed. Please check your credentials.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage(messageDiv, 'An error occurred. Please try again.', 'error');
    } finally {
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }
}

// ===========================
// CHECK REMEMBERED USER
// ===========================

function checkRememberedUser() {
    const remembered = localStorage.getItem('careercraft_remember');
    
    if (remembered) {
        const rememberData = JSON.parse(remembered);
        const now = Date.now();
        const dayInMs = 24 * 60 * 60 * 1000;
        
        // Check if remembered data is less than 7 days old
        if (now - rememberData.timestamp < 7 * dayInMs) {
            document.getElementById('email').value = rememberData.email;
            document.getElementById('rememberMe').checked = true;
            document.getElementById('password').focus();
        } else {
            // Clear expired remember data
            localStorage.removeItem('careercraft_remember');
        }
    }
}

// ===========================
// HELPER FUNCTIONS
// ===========================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';
    
    if (type === 'error') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// ===========================
// FORM ENTER KEY HANDLING
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('loginForm').dispatchEvent(new Event('submit'));
            }
        });
    }
});
