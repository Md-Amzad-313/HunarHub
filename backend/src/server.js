/**
 * server.js
 * Application entry point.
 * Loads environment variables, validates config, connects to DB, then starts Express.
 */

// Load environment variables first (before any other import reads process.env)
require('dotenv').config();

const validateEnv = require('./config/env');
const connectDB = require('./config/database');
const app = require('./app');

// ── Validate environment configuration ────────────────────────
validateEnv();

// ── Connect to MongoDB ────────────────────────────────────────
connectDB();

// ── Start HTTP server ─────────────────────────────────────────
const PORT = parseInt(process.env.PORT, 10) || 5000;

const server = app.listen(PORT, () => {
  console.log(`[SERVER] HunarHub API running on http://localhost:${PORT}`);
  console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[SERVER] Health check: http://localhost:${PORT}/api/health`);
});

// ── Graceful shutdown ─────────────────────────────────────────
const shutdown = (signal) => {
  console.log(`\n[SERVER] Received ${signal}. Shutting down gracefully…`);
  server.close(() => {
    console.log('[SERVER] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ── Unhandled rejections / exceptions ────────────────────────
process.on('unhandledRejection', (reason) => {
  console.error('[SERVER] Unhandled Promise Rejection:', reason);
});
process.on('uncaughtException', (error) => {
  console.error('[SERVER] Uncaught Exception:', error.message);
  process.exit(1);
});

module.exports = server;
