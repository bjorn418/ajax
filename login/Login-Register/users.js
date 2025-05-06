document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem('usersData')) || [];

    if (users.length === 0) {
        userList.innerHTML = '<li>No users found</li>';
        return;
    }

    // Display each user in the list
    users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = `Name: ${user.name}, Email: ${user.email}, Mobile: ${user.mobile}`;
        userList.appendChild(li);
    });
});
