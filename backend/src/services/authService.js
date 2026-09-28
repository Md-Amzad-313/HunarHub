/**
 * authService.js
 * Business logic for user registration, authentication, JWT token handling.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generate a signed JWT for an authenticated user.
 * Payload only contains minimal safe identity info: userId, role.
 * @param {object} user - User document or safe object
 * @returns {string} - JWT string
 */
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'hunarhub_dev_secret_fallback';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(
    {
      userId: user._id || user.id,
      role: user.role,
    },
    secret,
    { expiresIn }
  );
};

/**
 * Register a new user (customer or entrepreneur).
 * @param {object} userData - { name, email, password, role, phone }
 * @returns {Promise<{ user: object, token: string }>}
 */
const registerUser = async ({ name, email, password, role = 'customer', phone = '' }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if email already registered
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  // Create user
  const user = new User({
    name: name.trim(),
    email: normalizedEmail,
    password,
    role,
    phone: phone ? phone.trim() : '',
  });

  await user.save();

  const safeUser = user.toSafeObject();
  const token = generateToken(user);

  return { user: safeUser, token };
};

/**
 * Authenticate/login user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ user: object, token: string }>}
 */
const loginUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Find user and explicitly select password (since select: false in schema)
  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error('Your account has been deactivated. Please contact support.');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const safeUser = user.toSafeObject();
  const token = generateToken(user);

  return { user: safeUser, token };
};

/**
 * Retrieve user by ID for /me or current user profile.
 * @param {string} userId
 * @returns {Promise<object>} - safe user object
 */
const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error('Account deactivated');
    error.statusCode = 403;
    throw error;
  }

  return user.toSafeObject();
};

module.exports = {
  generateToken,
  registerUser,
  loginUser,
  getCurrentUser,
};
