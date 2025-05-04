// Fetch employee data and display it
fetch('/api/employees')
  .then(response => response.json())
  .then(data => {
    const employeeGrid = document.getElementById('employee-grid');
    const searchInput = document.getElementById('search');

    // Function to display employees
    const displayEmployees = (employees) => {
      employeeGrid.innerHTML = '';
      employees.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.className = 'employee-card';

        employeeCard.innerHTML = `
          <img src="${employee.image}" alt="${employee.name}">
          <div class="employee-details">
            <h3>${employee.name}</h3>
            <p>${employee.designation}</p>
            <p>${employee.department}</p>
            <p class="salary">$${employee.salary.toLocaleString()}</p>
          </div>
        `;
        employeeGrid.appendChild(employeeCard);
      });
    };

    // Initial display of employees
    displayEmployees(data);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredEmployees = data.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.designation.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm)
      );
      displayEmployees(filteredEmployees);
    });
  })
  .catch(error => console.error('Error fetching employee data:', error));