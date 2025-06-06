const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../../repositories/userRepository');
const { ValidationError, AuthenticationError } = require('../../utils/errors');

class AuthUseCases {
  async signup({ username, email, password }) {
    if (!username || !email || !password) {
      throw new ValidationError('All fields are required');
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const userResponse = user.toJSON();
    delete userResponse.password;

    return { user: userResponse, token };
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const userResponse = user.toJSON();
    delete userResponse.password;

    return { user: userResponse, token };
  }

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    const userResponse = user.toJSON();
    delete userResponse.password;
    return userResponse;
  }
}

module.exports = new AuthUseCases(); 