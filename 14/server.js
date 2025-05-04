const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware for serving static files
app.use(express.static('public'));

// API endpoint to fetch user data
app.get('/api/users', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'users.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});