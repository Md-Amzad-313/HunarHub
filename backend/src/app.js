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
const defaultAllowedOrigins = [
  'http://localhost:5173',
  'https://hunarhub-hazel.vercel.app',
];

const configuredOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : defaultAllowedOrigins;

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...configuredOrigins]));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (like curl, postman, server-to-server) or matched origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
