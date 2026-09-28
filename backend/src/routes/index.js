/**
 * index.js  (routes barrel)
 * Central router – mounts all sub-routers under /api.
 * Add new route modules here as features are implemented.
 */

const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

// ── Phase 0: Health Check ────────────────────────────────────
router.use('/health', healthRoutes);

// ── Phase 3.5: Authentication & Authorization ────────────────
router.use('/auth', authRoutes);

// ── Later Phases (placeholders, uncomment as implemented) ────
// router.use('/users',   require('./users.routes'));
// router.use('/products',require('./products.routes'));
// router.use('/orders',  require('./orders.routes'));

module.exports = router;
