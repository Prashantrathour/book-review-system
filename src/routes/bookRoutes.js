const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// Protected routes
router.post('/', authenticate, bookController.addBook);
router.put('/:id', authenticate, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);

module.exports = router;