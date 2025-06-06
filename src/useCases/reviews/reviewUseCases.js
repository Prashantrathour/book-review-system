const reviewRepository = require('../../repositories/reviewRepository');
const bookRepository = require('../../repositories/bookRepository');
const { ValidationError, AuthorizationError } = require('../../utils/errors');

class ReviewUseCases {
  async addReview({ rating, comment, book_id, user_id }) {
    if (!rating || rating < 1 || rating > 5) {
      throw new ValidationError('Rating must be between 1 and 5');
    }

    // Check if book exists
    await bookRepository.findById(book_id);

    // Check if user has already reviewed this book
    const existingReview = await reviewRepository.findExistingReview(book_id, user_id);
    if (existingReview) {
      throw new ValidationError('You have already reviewed this book');
    }

    return await reviewRepository.create({
      rating,
      comment,
      book_id: book_id,
      user_id: user_id
    });
  }

    async getBookReviews(book_id, { page, limit }) {
    const reviews = await reviewRepository.findByBookId(book_id, { page, limit });
    return {
      reviews: reviews.rows,
      total: reviews.count,
      page: parseInt(page),
      totalPages: Math.ceil(reviews.count / limit)
    };
  }

  async updateReview(id, { rating, comment }, user_id) {
    const review = await reviewRepository.findById(id);
    
    if (review.user_id !== user_id) {
      throw new AuthorizationError('Not authorized to update this review');
    }

    if (rating && (rating < 1 || rating > 5)) {
      throw new ValidationError('Rating must be between 1 and 5');
    }

    return await reviewRepository.update(id, {
      rating: rating || review.rating,
      comment: comment || review.comment
    });
  }

  async deleteReview(id, user_id) {
    const review = await reviewRepository.findById(id);
    
    if (review.user_id !== user_id) {
      throw new AuthorizationError('Not authorized to delete this review');
    }

    await reviewRepository.delete(id);
  }

  async getUserReviews(user_id) {
        return await reviewRepository.findByUserId(user_id);
  }

  async getBookAverageRating(book_id) {
    return await reviewRepository.getAverageRating(book_id);
  }
}

module.exports = new ReviewUseCases(); 