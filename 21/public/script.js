// Fetch and display all books
function fetchBooks() {
    fetch('/api/books')
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector('#book-table tbody');
        tableBody.innerHTML = ''; // Clear table before populating
        data.forEach((book) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.price}</td>
            <td>${book.genre}</td>
            <td>
              <button onclick="deleteBook('${book._id}')">Delete</button>
              <button onclick="editBook('${book._id}')">Edit</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });
  }
  
  // Add new book
  document
    .getElementById('add-book-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const price = document.getElementById('price').value;
      const genre = document.getElementById('genre').value;
  
      fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, price, genre }),
      }).then(() => {
        fetchBooks();
        document.getElementById('add-book-form').reset();
      });
    });
  
  // Delete book
  function deleteBook(id) {
    fetch(`/api/books/${id}`, { method: 'DELETE' }).then(() => fetchBooks());
  }
  
  // Edit book
  function editBook(id) {
    fetch(`/api/books`)
      .then((response) => response.json())
      .then((data) => {
        const book = data.find((b) => b._id === id);
        document.getElementById('update-id').value = book._id;
        document.getElementById('update-title').value = book.title;
        document.getElementById('update-author').value = book.author;
        document.getElementById('update-price').value = book.price;
        document.getElementById('update-genre').value = book.genre;
  
        document.getElementById('add-book-form').style.display = 'none';
        document.getElementById('update-book-form').style.display = 'block';
      });
  }
  
  // Update book
  document
    .getElementById('update-book-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('update-id').value;
      const title = document.getElementById('update-title').value;
      const author = document.getElementById('update-author').value;
      const price = document.getElementById('update-price').value;
      const genre = document.getElementById('update-genre').value;
  
      fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, price, genre }),
      }).then(() => {
        fetchBooks();
        document.getElementById('update-book-form').reset();
        document.getElementById('update-book-form').style.display = 'none';
        document.getElementById('add-book-form').style.display = 'block';
      });
    });
  
  // Cancel update
  document.getElementById('cancel-update').addEventListener('click', function () {
    document.getElementById('update-book-form').reset();
    document.getElementById('update-book-form').style.display = 'none';
    document.getElementById('add-book-form').style.display = 'block';
  });
  
  // Initial fetch
  fetchBooks();