const bookUseCases = require('../useCases/books/bookUseCases');
const asyncHandler = require('../utils/asyncHandler');
const { AuthenticationError } = require('../utils/errors');

// Add a new book
const addBook = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new AuthenticationError('User must be authenticated to add a book');
  }

  const book = await bookUseCases.addBook({
    ...req.body,
    user_id: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: { book }
  });
});

// Get all books with pagination and filters
const getBooks = asyncHandler(async (req, res) => {
  const result = await bookUseCases.getBooks(req.query);
  res.json({
    status: 'success',
    data: result
  });
});

// Get book by ID
const getBookById = asyncHandler(async (req, res) => {
  const book = await bookUseCases.getBookById(req.params.id);
  res.json({
    status: 'success',
    data: { book }
  });
});

// Update book
const updateBook = asyncHandler(async (req, res) => {
  const book = await bookUseCases.updateBook(
    req.params.id,
    req.body,
    req.user.id
  );

  res.json({
    status: 'success',
    data: { book }
  });
});

// Delete book
const deleteBook = asyncHandler(async (req, res) => {
  await bookUseCases.deleteBook(req.params.id, req.user.id);
  res.status(204).send();
});

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
}; 