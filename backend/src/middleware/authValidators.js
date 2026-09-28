/**
 * auth.validators.js
 * Express-validator middleware rules for authentication endpoints.
 */

const { body } = require('express-validator');

/**
 * Validation rules for user registration.
 * Role can only be 'customer' or 'entrepreneur' via public registration.
 * Admin registration is explicitly rejected.
 */
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('role')
    .optional()
    .trim()
    .custom((value) => {
      if (value === 'admin') {
        throw new Error('Admin registration is not allowed through public endpoints');
      }
      if (!['customer', 'entrepreneur'].includes(value)) {
        throw new Error('Role must be either customer or entrepreneur');
      }
      return true;
    }),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .custom((value) => {
      if (!value) return true;
      // Allow flexible international/national phone strings with +, spaces, digits, dashes
      const cleaned = value.replace(/[\s\-()]/g, '');
      if (!/^\+?[0-9]{7,15}$/.test(cleaned)) {
        throw new Error('Please provide a valid phone number');
      }
      return true;
    }),
];

/**
 * Validation rules for user login.
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

module.exports = {
  registerValidation,
  loginValidation,
};
