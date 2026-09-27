/**
 * database.js
 * Mongoose connection utility.
 * Connects to MongoDB using the URI from environment variables.
 * The application starts regardless of DB availability;
 * a warning is logged if the connection fails.
 */

const mongoose = require('mongoose');

let isListenersAttached = false;

const attachConnectionListeners = () => {
  if (isListenersAttached) return;
  isListenersAttached = true;

  mongoose.connection.on('disconnected', () => {
    console.warn('[DB] MongoDB disconnected.');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`[DB] MongoDB connection error: ${err.message}`);
  });
};

/**
 * Establish a Mongoose connection to MongoDB.
 * @returns {Promise<typeof mongoose | undefined>}
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      '[DB] MONGODB_URI is not set. Skipping database connection.\n' +
        '     Set MONGODB_URI in your .env file to enable the database.'
    );
    return;
  }

  attachConnectionListeners();

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[DB] MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[DB] MongoDB connection failed: ${error.message}`);
    // Do NOT crash the process; the health endpoint can report DB status.
  }
};

/**
 * Close Mongoose connection cleanly.
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('[DB] MongoDB connection closed.');
  }
};

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.disconnectDB = disconnectDB;

