document.addEventListener('DOMContentLoaded', function () {
    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    registrationForm?.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Get form values
      const user = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        mobile: document.getElementById('mobile').value.trim(),
        dob: document.getElementById('dob').value.trim(),
        city: document.getElementById('city').value.trim(),
        address: document.getElementById('address').value.trim(),
        password: document.getElementById('password').value.trim(),
      };
  
      // Validate fields
      if (!validateUser(user)) {
        alert('Please fill all fields correctly.');
        return;
      }
  
      // Save user to local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('Registration successful!');
      window.location.href = 'login.html';
    });
  
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    loginForm?.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Get login values
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
  
      // Retrieve users from local storage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        alert('Login successful!');
        window.location.href = 'data.html';
      } else {
        alert('Invalid email or password!');
      }
    });
  
    // Load users into the structured cards
    if (window.location.pathname.includes('data.html')) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userCards = document.getElementById('userCards');
      users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user-card');
        card.innerHTML = `
          <h2>${user.name}</h2>
          <p><span>Email:</span> ${user.email}</p>
          <p><span>Mobile:</span> ${user.mobile}</p>
          <p><span>Date of Birth:</span> ${user.dob}</p>
          <p><span>City:</span> ${user.city}</p>
          <p><span>Address:</span> ${user.address}</p>
        `;
        userCards.appendChild(card);
      });
  
      // Add "Clear All Users" functionality
      const clearUsersBtn = document.getElementById('clearUsersBtn');
      clearUsersBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to clear all users?')) {
          localStorage.removeItem('users');
          alert('All users have been cleared.');
          location.reload();
        }
      });
    }
  
    function validateUser(user) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[0-9]{10}$/;
  
      return (
        user.name &&
        emailRegex.test(user.email) &&
        mobileRegex.test(user.mobile) &&
        user.dob &&
        user.city &&
        user.address &&
        user.password.length >= 6
      );
    }
  });