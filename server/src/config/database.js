/**
 * database.js
 * Mongoose connection utility.
 * Connects to MongoDB using the URI from environment variables.
 * The application starts regardless of DB availability;
 * a warning is logged if the connection fails.
 */

const mongoose = require('mongoose');

/**
 * Establish a Mongoose connection to MongoDB.
 * @returns {Promise<void>}
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

  try {
    const conn = await mongoose.connect(uri, {
      // These options are the modern Mongoose defaults; listed for clarity.
      serverSelectionTimeoutMS: 5000, // fail fast if MongoDB is unreachable
    });

    console.log(`[DB] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DB] MongoDB connection failed: ${error.message}`);
    // Do NOT crash the process; the health endpoint can report DB status.
  }
};

module.exports = connectDB;
