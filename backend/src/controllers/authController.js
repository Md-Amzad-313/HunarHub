/**
 * authController.js
 * Controller handling authentication request endpoints.
 */

const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Helper to extract express-validator errors.
 */
const checkValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    res.status(400).json(errorResponse('Validation failed', 400, formattedErrors));
    return false;
  }
  return true;
};

/**
 * POST /api/auth/register
 * Public registration for customer and entrepreneur roles.
 */
const register = async (req, res, next) => {
  try {
    if (!checkValidation(req, res)) return;

    const { name, email, password, role, phone } = req.body;

    const result = await authService.registerUser({
      name,
      email,
      password,
      role,
      phone,
    });

    return res.status(201).json(
      successResponse('User registered successfully', {
        user: result.user,
        token: result.token,
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * User login with credentials.
 */
const login = async (req, res, next) => {
  try {
    if (!checkValidation(req, res)) return;

    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    return res.status(200).json(
      successResponse('Login successful', {
        user: result.user,
        token: result.token,
      })
    );
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Retrieve profile of the currently authenticated user.
 */
const getMe = async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId;
    if (!userId) {
      return res.status(401).json(errorResponse('Unauthorized', 401));
    }

    const user = await authService.getCurrentUser(userId);

    return res.status(200).json(
      successResponse('User profile retrieved successfully', { user })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
