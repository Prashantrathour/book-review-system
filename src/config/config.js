require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: process.env.DB_PATH || './database.sqlite',
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
}; 