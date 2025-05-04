const Employee = require('../models/employeeModel');

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, department, designation, salary, joiningDate } = req.body;
    const newEmployee = new Employee({ name, department, designation, salary, joiningDate });
    await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add employee', details: error.message });
  }
};

// View all employee records
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees', details: error.message });
  }
};

// Update an existing employee’s details
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee', details: error.message });
  }
};

// Delete an employee record
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee', details: error.message });
  }
};