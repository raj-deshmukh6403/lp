const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/student', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.redirect('/students');
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});
