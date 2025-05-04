const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const songRoutes = require('./routes/songs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use routes
app.use('/songs', songRoutes);

// Default route
app.get('/', (req, res) => res.redirect('/songs'));

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
