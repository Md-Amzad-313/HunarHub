/**
 * app.js
 * Express application factory.
 * Configures middleware, routes, and error handling.
 * Separated from server.js so the app can be imported in tests.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const apiRoutes = require('./routes/index');

const app = express();

// ── Security ─────────────────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────────
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// ── Body Parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Request Logging ──────────────────────────────────────────
app.use(requestLogger);

// ── API Routes ───────────────────────────────────────────────
app.use('/api', apiRoutes);

// ── Root Route ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to HunarHub API',
    docs: '/api/health',
    version: '0.1.0',
  });
});

// ── 404 & Error Handling ─────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
