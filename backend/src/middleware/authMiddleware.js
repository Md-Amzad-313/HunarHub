/**
 * authMiddleware.js
 * Middleware for JWT verification and role-based authorization.
 */

const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware: Verify Bearer JWT in Authorization header.
 * Attaches decoded payload { userId, role } to req.user upon success.
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(
      errorResponse('Authentication token is required. Format: Bearer <token>', 401)
    );
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1].trim()) {
    return res.status(401).json(
      errorResponse('Malformed authorization header. Format: Bearer <token>', 401)
    );
  }

  const token = parts[1].trim();
  const secret = process.env.JWT_SECRET || 'hunarhub_dev_secret_fallback';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(errorResponse('Authentication token has expired', 401));
    }
    return res.status(401).json(errorResponse('Invalid authentication token', 401));
  }
};

/**
 * Middleware: Authorize user by allowed roles.
 * Must be used after authenticateJWT.
 * @param  {...string} allowedRoles - e.g. 'admin', 'entrepreneur', 'customer'
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json(errorResponse('Unauthorized: User not authenticated', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json(
        errorResponse(
          `Forbidden: You do not have permission to access this resource. Required role: ${allowedRoles.join(' or ')}`,
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  authenticateJWT,
  authorizeRoles,
};
