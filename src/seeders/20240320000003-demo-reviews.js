'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [{
      rating: 5,
      comment: 'A masterpiece of American literature!',
      UserId: 1,
      BookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      rating: 4,
      comment: 'Powerful and thought-provoking.',
      UserId: 1,
      BookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
}; 