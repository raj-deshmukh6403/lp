const express = require('express');
const {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

// Route to add a new employee
router.post('/', addEmployee);

// Route to view all employees
router.get('/', getAllEmployees);

// Route to update an employee's details
router.put('/:id', updateEmployee);

// Route to delete an employee
router.delete('/:id', deleteEmployee);

module.exports = router;