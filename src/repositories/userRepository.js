const User = require('../models/User');
const { NotFoundError } = require('../utils/errors');

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  }

  async update(id, userData) {
    const user = await this.findById(id);
    return await user.update(userData);
  }

  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();
  }
}

module.exports = new UserRepository(); 