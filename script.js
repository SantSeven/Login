// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const messageDiv = document.getElementById('message');

// Function to show message
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = 'message';
    }, 5000);
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate password
function validatePassword(password) {
    // Password should be at least 6 characters
    return password.length >= 6;
}

// Load saved email if "Remember me" was checked
window.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});

// Handle form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Validate email
    if (!validateEmail(email)) {
        showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
        emailInput.focus();
        return;
    }
    
    // Validate password
    if (!validatePassword(password)) {
        showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
        passwordInput.focus();
        return;
    }
    
    // Handle "Remember me"
    if (remember) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
    
    // Simulate login (in a real application, this would be an API call)
    showMessage('¡Inicio de sesión exitoso! Bienvenido.', 'success');
    
    // Log credentials to console for demonstration
    console.log('Login attempt:', {
        email: email,
        password: '********',
        remember: remember
    });
    
    // Optional: Clear the form after successful login
    setTimeout(() => {
        // In a real app, you would redirect to another page here
        // window.location.href = '/dashboard';
        passwordInput.value = '';
    }, 2000);
});

// Add input validation feedback
emailInput.addEventListener('blur', () => {
    if (emailInput.value && !validateEmail(emailInput.value)) {
        emailInput.style.borderColor = '#dc3545';
    } else {
        emailInput.style.borderColor = '#e0e0e0';
    }
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
        passwordInput.style.borderColor = '#dc3545';
    } else {
        passwordInput.style.borderColor = '#e0e0e0';
    }
});

// Reset border color on focus
emailInput.addEventListener('focus', () => {
    emailInput.style.borderColor = '#667eea';
});

passwordInput.addEventListener('focus', () => {
    passwordInput.style.borderColor = '#667eea';
});
