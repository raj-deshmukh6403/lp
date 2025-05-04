const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// API endpoint to fetch employee data
app.get('/api/employees', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'employees.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read employee data' });
    }
    const employees = JSON.parse(data);
    res.json(employees);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});