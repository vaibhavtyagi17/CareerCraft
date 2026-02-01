// ===========================
// SIGNUP PAGE JAVASCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
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
// SIGNUP HANDLER
// ===========================

async function handleSignup(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('signupMessage');
    
    // Validation
    if (!fullname || !email || !password || !confirmPassword) {
        showMessage(messageDiv, 'Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage(messageDiv, 'Password must be at least 6 characters long', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage(messageDiv, 'Passwords do not match', 'error');
        return;
    }
    
    if (fullname.length < 3) {
        showMessage(messageDiv, 'Name must be at least 3 characters long', 'error');
        return;
    }
    
    // Show loading state
    const signupBtn = document.querySelector('.auth-button');
    const originalText = signupBtn.textContent;
    signupBtn.textContent = 'Creating Account...';
    signupBtn.disabled = true;
    
    try {
        // Call backend API
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullname,
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
                token: data.token,
                fullname: fullname
            };
            
            localStorage.setItem('careercraft_user', JSON.stringify(userData));
            
            showMessage(messageDiv, 'Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage(messageDiv, data.message || 'Signup failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showMessage(messageDiv, 'An error occurred. Please try again.', 'error');
    } finally {
        signupBtn.textContent = originalText;
        signupBtn.disabled = false;
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
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('signupForm').dispatchEvent(new Event('submit'));
            }
        });
    }
});
