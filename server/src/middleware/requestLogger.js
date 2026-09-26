/**
 * requestLogger.js
 * Development request logger using morgan.
 * In production, a more structured logger (e.g., winston) can replace this.
 */

const morgan = require('morgan');

const requestLogger = morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev');

module.exports = requestLogger;
