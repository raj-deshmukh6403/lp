// Fetch and display all employees
function fetchEmployees() {
    fetch('/api/employees')
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector('#employee-table tbody');
        tableBody.innerHTML = ''; // Clear table before populating
        data.forEach((employee) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.designation}</td>
            <td>${employee.salary}</td>
            <td>${new Date(employee.joiningDate).toLocaleDateString()}</td>
            <td>
              <button onclick="deleteEmployee('${employee._id}')">Delete</button>
              <button onclick="editEmployee('${employee._id}')">Edit</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  }
  
  // Add new employee
  document
    .getElementById('add-employee-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const department = document.getElementById('department').value;
      const designation = document.getElementById('designation').value;
      const salary = document.getElementById('salary').value;
      const joiningDate = document.getElementById('joiningDate').value;
  
      fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, department, designation, salary, joiningDate }),
      }).then(() => {
        fetchEmployees();
        document.getElementById('add-employee-form').reset();
      });
    });
  
  // Delete employee
  function deleteEmployee(id) {
    fetch(`/api/employees/${id}`, { method: 'DELETE' }).then(() => fetchEmployees());
  }
  
  // Edit employee
  function editEmployee(id) {
    fetch(`/api/employees`)
      .then((response) => response.json())
      .then((data) => {
        const employee = data.find((emp) => emp._id === id);
        document.getElementById('update-id').value = employee._id;
        document.getElementById('update-name').value = employee.name;
        document.getElementById('update-department').value = employee.department;
        document.getElementById('update-designation').value = employee.designation;
        document.getElementById('update-salary').value = employee.salary;
        document.getElementById('update-joiningDate').value = employee.joiningDate.split('T')[0];
  
        document.getElementById('add-employee-form').style.display = 'none';
        document.getElementById('update-employee-form').style.display = 'block';
      });
  }
  
  // Update employee
  document
    .getElementById('update-employee-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('update-id').value;
      const name = document.getElementById('update-name').value;
      const department = document.getElementById('update-department').value;
      const designation = document.getElementById('update-designation').value;
      const salary = document.getElementById('update-salary').value;
      const joiningDate = document.getElementById('update-joiningDate').value;
  
      fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, department, designation, salary, joiningDate }),
      }).then(() => {
        fetchEmployees();
        document.getElementById('update-employee-form').reset();
        document.getElementById('update-employee-form').style.display = 'none';
        document.getElementById('add-employee-form').style.display = 'block';
      });
    });
  
  // Cancel update
  document.getElementById('cancel-update').addEventListener('click', function () {
    document.getElementById('update-employee-form').reset();
    document.getElementById('update-employee-form').style.display = 'none';
    document.getElementById('add-employee-form').style.display = 'block';
  });
  
  // Initial fetch
  fetchEmployees();