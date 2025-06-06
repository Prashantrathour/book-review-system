const Book = require('../models/Book');
const Review = require('../models/Review');
const User = require('../models/User');
const { NotFoundError } = require('../utils/errors');
const { Op } = require('sequelize');

class BookRepository {
  async create(bookData) {
    return await Book.create(bookData);
  }

  async findById(id) {
    const book = await Book.findByPk(id, {
      include: [{
        model: Review,
        include: [{
          model: User,
          attributes: ['username']
        }]
      }]
    });

    if (!book) {
      throw new NotFoundError('Book not found');
    }

    return book;
  }

  async findAll({ page = 1, limit = 10, author, genre, search }) {
    const offset = (page - 1) * limit;
    const where = {};

    if (author) where.author = author;
    if (genre) where.genre = genre;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } }
      ];
    }

    return await Book.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: Review,
        attributes: ['rating']
      }],
      order: [['created_at', 'DESC']]
    });
  }

  async update(id, bookData) {
    const book = await this.findById(id);
    return await book.update(bookData);
  }

  async delete(id) {
    const book = await this.findById(id);
    await book.destroy();
  }

  async findByUserId(userId) {
    return await Book.findAll({
      where: { user_id: userId },
      include: [{
        model: Review,
        attributes: ['rating']
      }]
    });
  }
}

module.exports = new BookRepository(); 