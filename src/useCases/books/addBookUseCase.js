const bookRepository = require('../../repositories/bookRepository');
const { ValidationError } = require('../../utils/errors');

class AddBookUseCase {
  async execute({ title, author, genre, description }, userId) {
    // Validate input
    if (!title || !author || !genre) {
      throw new ValidationError('Title, author, and genre are required');
    }

    // Create book
    const book = await bookRepository.create({
      title,
      author,
      genre,
      description,
      UserId: userId // Track who added the book
    });

    return book;
  }
}

module.exports = new AddBookUseCase(); 