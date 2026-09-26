/**
 * healthController.js
 * Handles the GET /api/health endpoint.
 */

const mongoose = require('mongoose');

/**
 * Returns server status, DB connection state, and runtime metadata.
 * @route  GET /api/health
 * @access Public
 */
const getHealth = (req, res) => {
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbState = mongoose.connection.readyState;

  res.status(200).json({
    success: true,
    message: 'HunarHub API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    database: {
      status: dbStates[dbState] || 'unknown',
      uri: process.env.MONGODB_URI
        ? `${process.env.MONGODB_URI.split('@').pop()}` // hide credentials
        : 'not configured',
    },
    version: '0.1.0',
  });
};

module.exports = { getHealth };
