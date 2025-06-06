const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/books/:book_id/reviews', reviewController.getBookReviews);

// Protected routes
router.post('/books/:book_id/reviews', authenticate, reviewController.addReview);
router.put('/reviews/:id', authenticate, reviewController.updateReview);
router.delete('/reviews/:id', authenticate, reviewController.deleteReview);

module.exports = router; 