const reviewRepository = require('../../repositories/reviewRepository');
const bookRepository = require('../../repositories/bookRepository');
const { ValidationError } = require('../../utils/errors');

class AddReviewUseCase {
  async execute({ book_id, rating, comment }, user_id) {
    // Validate input
    if (!book_id || !rating) {
      throw new ValidationError('Book ID and rating are required');
    }

    // Check if book exists
    const book = await bookRepository.findById(book_id);
    if (!book) {
      throw new ValidationError('Book not found');
    }

    // Check if user already reviewed this book
    const existingReview = await reviewRepository.findByUserAndBook(user_id, book_id);
    if (existingReview) {
      throw new ValidationError('You have already reviewed this book');
    }

    // Create review
    const review = await reviewRepository.create({
      rating,
      comment,
      book_id: book_id,
      user_id: user_id
    });

    // Update book's average rating
        const averageRating = await reviewRepository.getAverageRating(book_id);
    await book.update({ averageRating });

    return review;
  }
}

module.exports = new AddReviewUseCase(); 