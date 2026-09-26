/**
 * apiResponse.js
 * Utility helpers for building consistent API response objects.
 * Used by controllers to keep response shape uniform across the API.
 */

/**
 * Build a success response payload.
 * @param {string} message
 * @param {*} data
 * @param {object} [meta]  - pagination or extra metadata
 */
const successResponse = (message, data = null, meta = null) => ({
  success: true,
  message,
  ...(data !== null && { data }),
  ...(meta !== null && { meta }),
});

/**
 * Build an error response payload.
 * @param {string} message
 * @param {number} statusCode
 * @param {*}      [errors]
 */
const errorResponse = (message, statusCode = 500, errors = null) => ({
  success: false,
  message,
  statusCode,
  ...(errors !== null && { errors }),
});

module.exports = { successResponse, errorResponse };
