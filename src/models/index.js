const User = require('./User');
const Book = require('./Book');
const Review = require('./Review');

// Define associations
User.hasMany(Book);
Book.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

module.exports = {
  User,
  Book,
  Review
}; 