/**
 * env.js
 * Centralised environment-variable validation.
 * Logs a warning for any expected variable that is absent in development,
 * and throws in production to prevent silent misconfiguration.
 */

const REQUIRED_IN_PRODUCTION = ['MONGODB_URI', 'JWT_SECRET'];

const validateEnv = () => {
  if (process.env.NODE_ENV === 'production') {
    const missing = REQUIRED_IN_PRODUCTION.filter((key) => !process.env[key]);
    if (missing.length) {
      throw new Error(
        `[ENV] Missing required environment variables in production: ${missing.join(', ')}`
      );
    }
  } else {
    // Development – warn but don't crash.
    if (!process.env.MONGODB_URI) {
      console.warn('[ENV] MONGODB_URI is not set. Database features will be unavailable.');
    }
    if (!process.env.JWT_SECRET) {
      console.warn('[ENV] JWT_SECRET is not set. Authentication will not work correctly.');
    }
  }
};

module.exports = validateEnv;
