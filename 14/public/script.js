// Fetch user data from the API and display it
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    const userList = document.getElementById('user-list');
    data.forEach(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<span>${user.name}</span> <span>${user.email}</span>`;
      userList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching user data:', error));