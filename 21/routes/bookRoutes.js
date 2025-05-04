const express = require('express');
const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

// Route to add a new book
router.post('/', addBook);

// Route to retrieve all books
router.get('/', getAllBooks);

// Route to update book details
router.put('/:id', updateBook);

// Route to delete a book
router.delete('/:id', deleteBook);

module.exports = router;