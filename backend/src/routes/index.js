/**
 * index.js  (routes barrel)
 * Central router – mounts all sub-routers under /api.
 * Add new route modules here as features are implemented.
 */

const express = require('express');
const healthRoutes = require('./health.routes');

const router = express.Router();

// ── Phase 0 ─────────────────────────────────────────────────
router.use('/health', healthRoutes);

// ── Phase 1+ (placeholders, uncomment as implemented) ────────
// router.use('/auth',     require('./auth.routes'));
// router.use('/users',   require('./users.routes'));
// router.use('/products',require('./products.routes'));
// router.use('/orders',  require('./orders.routes'));

module.exports = router;
