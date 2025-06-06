const Review = require('../models/Review');
const User = require('../models/User');
const Book = require('../models/Book');
const { NotFoundError } = require('../utils/errors');

class ReviewRepository {
  async create(reviewData) {
    return await Review.create(reviewData);
  }

  async findById(id) {
    const review = await Review.findByPk(id, {
      include: [{
        model: Book,
        attributes: ['title', 'author', 'genre', 'description']
      }]
    });
    if (!review) {
      throw new NotFoundError('Review not found');
    }
    return review;
  }

  async findByUserAndBook(user_id, book_id) {
    return await Review.findOne({
      where: { user_id: user_id, book_id: book_id },
      include: [{
        model: Book,
        attributes: ['title', 'author', 'genre', 'description']
      }]
    });
  }

  async findByBookId(book_id, { page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    return await Review.findAndCountAll({
      where: { book_id: book_id },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Book,
          attributes: ['title', 'author', 'genre', 'description']
        }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  async findByUserId(user_id) {
    return await Review.findAll({
      where: { user_id: user_id },
      include: [{
        model: Book,
        attributes: ['title', 'author', 'genre', 'description']
      }]
    });
  }

  async findExistingReview(book_id, user_id) {
    return await Review.findOne({
      where: {
        book_id: book_id,
        user_id: user_id
      },
      include: [{
        model: Book,
        attributes: ['title', 'author', 'genre', 'description']
      }]
    });
  }

  async update(id, reviewData) {
    const review = await this.findById(id);
    return await review.update(reviewData);
  }

  async delete(id) {
    const review = await this.findById(id);
    await review.destroy();
  }

  async getAverageRating(book_id) {
    const reviews = await Review.findAll({
      where: { book_id: book_id },
      attributes: ['rating']
    });

    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }
}

module.exports = new ReviewRepository();