const bookRepository = require('../../repositories/bookRepository');
const { ValidationError, AuthorizationError } = require('../../utils/errors');

class BookUseCases {
  async addBook({ title, author, genre, description, user_id }) {
    if (!title || !author || !genre) {
      throw new ValidationError('Title, author, and genre are required');
    }

    const book = await bookRepository.create({
      title,
      author,
      genre,
      description,
      user_id
    });

    return book;
  }

  async getBooks({ page, limit, author, genre, search }) {
    const books = await bookRepository.findAll({ page, limit, author, genre, search });
    
    // Calculate average ratings
    const booksWithRatings = books.rows.map(book => {
      const bookJson = book.toJSON();
      const ratings = bookJson.Reviews.map(review => review.rating);
      bookJson.averageRating = ratings.length ? 
        ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
      delete bookJson.Reviews;
      return bookJson;
    });

    return {
      books: booksWithRatings,
      total: books.count,
      page: parseInt(page),
      totalPages: Math.ceil(books.count / limit)
    };
  }

  async getBookById(id) {
    const book = await bookRepository.findById(id);
    const bookJson = book.toJSON();
    
    // Calculate average rating
    const ratings = bookJson.Reviews.map(review => review.rating);
    bookJson.averageRating = ratings.length ? 
      ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    return bookJson;
  }

  async updateBook(id, { title, author, genre, description }, user_id) {
    const book = await bookRepository.findById(id);
    
    if (book.user_id !== user_id) {
      throw new AuthorizationError('Not authorized to update this book');
    }

    return await bookRepository.update(id, {
      title: title || book.title,
      author: author || book.author,
      genre: genre || book.genre,
      description: description || book.description
    });
  }

  async deleteBook(id, user_id) {
    const book = await bookRepository.findById(id);
    
    if (book.user_id !== user_id) {
      throw new AuthorizationError('Not authorized to delete this book');
    }

    await bookRepository.delete(id);
  }

  async getUserBooks(user_id) {
    const books = await bookRepository.findByUserId(user_id);
    return books.map(book => {
      const bookJson = book.toJSON();
      const ratings = bookJson.Reviews.map(review => review.rating);
      bookJson.averageRating = ratings.length ? 
        ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
      delete bookJson.Reviews;
      return bookJson;
    });
  }
}

module.exports = new BookUseCases(); 