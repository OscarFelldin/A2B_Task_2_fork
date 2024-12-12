document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = 'Login successful!';
            messageDiv.style.color = 'green';
            // Store the JWT token
            localStorage.setItem('token', data.token);
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            messageDiv.textContent = data.message || 'Login failed';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.textContent = 'An error occurred during login';
        messageDiv.style.color = 'red';
    }
}); 