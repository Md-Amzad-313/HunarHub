/**
 * health.routes.js
 * Route definitions for the /api/health endpoint.
 */

const express = require('express');
const { getHealth } = require('../controllers/healthController');

const router = express.Router();

// GET /api/health
router.get('/', getHealth);

module.exports = router;
