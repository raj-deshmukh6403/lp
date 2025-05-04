const express = require('express');
const mongoose = require('./database/db');
const bodyParser = require('body-parser');
const path = require('path');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from "public" folder

// Routes
app.use('/api/employees', employeeRoutes);

// Home Page for Employee Records
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});