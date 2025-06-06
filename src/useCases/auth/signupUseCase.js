const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/userRepository');
const { ValidationError } = require('../../utils/errors');

class SignupUseCase {
  async execute({ username, email, password }) {
    // Validate input
    if (!username || !email || !password) {
      throw new ValidationError('All fields are required');
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return { user, token };
  }
}

module.exports = new SignupUseCase(); 