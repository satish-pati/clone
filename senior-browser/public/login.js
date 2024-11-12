const loginForm = document.getElementById('login-form');
const message = document.getElementById('message');
//add listner
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // fetch vidoes 
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            //if successfull 
            chrome.storage.local.set({ isLoggedIn: true, username: username }, () => {
                message.textContent = 'Login successful!';
                // Redirect to the restricted page
                window.location.href = "https://www.google.com/";
            });
            message.textContent = 'Login successful!';
            
        } else {
            message.textContent = 'Invalid credentials';
        }
    } catch (error) {
        message.textContent = 'Error logging in';
    }
});
