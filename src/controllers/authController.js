const authUseCases = require('../useCases/auth/authUseCases');
const asyncHandler = require('../utils/asyncHandler');

// Signup controller
const signup = asyncHandler(async (req, res) => {
  const result = await authUseCases.signup(req.body);
  res.status(201).json({
    status: 'success',
    data: result
  });
});

// Login controller
const login = asyncHandler(async (req, res) => {
  const result = await authUseCases.login(req.body);
  res.json({
    status: 'success',
    data: result
  });
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authUseCases.getCurrentUser(req.user.id);
  res.json({
    status: 'success',
    data: { user }
  });
});

module.exports = {
  signup,
  login,
  getCurrentUser
}; 