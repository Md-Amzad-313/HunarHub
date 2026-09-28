/**
 * auth.routes.js
 * Routing for authentication endpoints under /api/auth.
 */

const express = require('express');
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/authValidators');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new customer or entrepreneur
 * @access  Public
 */
router.post('/register', registerValidation, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', loginValidation, authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged in user profile
 * @access  Private (Requires valid JWT Bearer token)
 */
router.get('/me', authenticateJWT, authController.getMe);

module.exports = router;
