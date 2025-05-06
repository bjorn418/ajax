document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const viewUsersBtn = document.getElementById('viewUsersBtn');

    const localStorageKey = 'usersData'; // Key for local storage

    // Handle form submission for registration
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const dob = document.getElementById('dob').value;
        const city = document.getElementById('city').value;
        const address = document.getElementById('address').value;

        // Basic Validation
        if (!name || !email || !mobile || !dob || !city || !address) {
            alert('All fields are required');
            return;
        }

        const userData = {
            name,
            email,
            mobile,
            dob,
            city,
            address
        };

        // Get existing users from local storage or initialize empty array
        const users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        // Add new user to the array
        users.push(userData);

        // Store the updated users list in local storage
        localStorage.setItem(localStorageKey, JSON.stringify(users));

        alert('Registration successful!');
        registrationForm.reset(); // Reset form
    });

    // Handle form submission for login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Basic Validation
        if (!username || !password) {
            alert('Both fields are required');
            return;
        }

        alert('Login successful!');
        loginForm.reset(); // Reset form
    });

    // View users on a new page
    viewUsersBtn.addEventListener('click', () => {
        window.location.href = 'users.html';
    });
});
