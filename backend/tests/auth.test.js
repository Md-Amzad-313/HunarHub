/**
 * auth.test.js
 * Comprehensive automated test suite for Phase 3.5 Authentication & RBAC.
 */

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/User');
const { authorizeRoles, authenticateJWT } = require('../src/middleware/authMiddleware');

describe('Phase 3.5 — Authentication & Role-Based Access Control', () => {
  const MONGODB_TEST_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hunarhub_test';
  let customerToken = '';
  let entrepreneurToken = '';
  let customerId = '';
  let entrepreneurId = '';

  beforeAll(async () => {
    // Connect to test database if not connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_TEST_URI);
    }
    // Clean up users collection before tests
    await User.deleteMany({ email: /@test-auth\.com$/i });
  });

  afterAll(async () => {
    // Clean up created test users
    await User.deleteMany({ email: /@test-auth\.com$/i });
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  // ── 1. User Model & Password Hashing ─────────────────────────
  describe('1. User Model & Password Security', () => {
    it('should securely hash password upon save and not save plaintext', async () => {
      const plainPassword = 'securePassword123';
      const user = new User({
        name: 'Model Test User',
        email: 'model-test@test-auth.com',
        password: plainPassword,
        role: 'customer',
      });

      await user.save();
      expect(user.password).not.toBe(plainPassword);
      expect(user.password.startsWith('$2')).toBe(true);

      const isMatch = await user.comparePassword(plainPassword);
      expect(isMatch).toBe(true);

      const isWrongMatch = await user.comparePassword('wrongPassword');
      expect(isWrongMatch).toBe(false);

      const safeObj = user.toSafeObject();
      expect(safeObj.password).toBeUndefined();
      expect(safeObj.__v).toBeUndefined();
      expect(safeObj.email).toBe('model-test@test-auth.com');
    });
  });

  // ── 2 & 3. Registration (Customer & Entrepreneur) ────────────
  describe('2 & 3. User Registration', () => {
    it('should successfully register a customer account and return safe data with JWT', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Sara Khan',
          email: 'sara.customer@test-auth.com',
          password: 'CustomerPass123!',
          role: 'customer',
          phone: '+919876543210',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data.user.email).toBe('sara.customer@test-auth.com');
      expect(res.body.data.user.role).toBe('customer');
      expect(res.body.data.user.password).toBeUndefined();

      customerToken = res.body.data.token;
      customerId = res.body.data.user._id;
    });

    it('should successfully register an entrepreneur account', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Fatima Zari Crafts',
          email: 'fatima.artisan@test-auth.com',
          password: 'ArtisanPass123!',
          role: 'entrepreneur',
          phone: '+919876543211',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.role).toBe('entrepreneur');
      expect(res.body.data.user.password).toBeUndefined();

      entrepreneurToken = res.body.data.token;
      entrepreneurId = res.body.data.user._id;
    });
  });

  // ── 4. Duplicate Email Registration ──────────────────────────
  describe('4. Duplicate Email Protection', () => {
    it('should reject registration if email is already registered', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Duplicate Attempt',
          email: 'sara.customer@test-auth.com',
          password: 'Password123!',
          role: 'customer',
        });

      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/already registered/i);
    });
  });

  // ── 5. Invalid Registration Input ────────────────────────────
  describe('5. Input Validation', () => {
    it('should reject registration with invalid email, short password, or missing name', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: '',
          email: 'invalid-email-format',
          password: '123',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeInstanceOf(Array);
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });

  // ── 6. Admin Registration Block ──────────────────────────────
  describe('6. Public Admin Registration Prevention', () => {
    it('should reject public registration attempts requesting role admin', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Hacker Admin',
          email: 'hacker.admin@test-auth.com',
          password: 'AdminPassword123!',
          role: 'admin',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Validation failed/i);
    });
  });

  // ── 7, 8, 9. Login Tests ─────────────────────────────────────
  describe('7, 8 & 9. User Authentication / Login', () => {
    it('should successfully log in with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'sara.customer@test-auth.com',
          password: 'CustomerPass123!',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user.email).toBe('sara.customer@test-auth.com');
      expect(res.body.data.user.password).toBeUndefined();
    });

    it('should reject login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'sara.customer@test-auth.com',
          password: 'WrongPassword999!',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Invalid email or password/i);
    });

    it('should reject login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent.user@test-auth.com',
          password: 'CustomerPass123!',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Invalid email or password/i);
    });
  });

  // ── 10, 11, 12. Protected /api/auth/me Endpoint ──────────────
  describe('10, 11 & 12. Current User Profile (/api/auth/me)', () => {
    it('should return 401 when token is missing', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/token is required/i);
    });

    it('should return 401 when token is malformed or invalid', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid.jwt.token');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/Invalid authentication token/i);
    });

    it('should return 200 and safe user data when valid JWT token is provided', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('sara.customer@test-auth.com');
      expect(res.body.data.user.name).toBe('Sara Khan');
      expect(res.body.data.user.password).toBeUndefined();
    });
  });

  // ── 13. Role Authorization Middleware ────────────────────────
  describe('13. Role Authorization Middleware', () => {
    it('should allow access when user role matches authorized role', () => {
      const req = { user: { userId: '123', role: 'admin' } };
      const res = {};
      const next = jest.fn();

      const middleware = authorizeRoles('admin', 'entrepreneur');
      middleware(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should return 403 when customer tries to access entrepreneur/admin route', () => {
      const req = { user: { userId: '123', role: 'customer' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const middleware = authorizeRoles('entrepreneur', 'admin');
      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          statusCode: 403,
        })
      );
    });
  });

  // ── 14. Password / Hash Never Exposed ────────────────────────
  describe('14. Password and Sensitive Data Exposure Prevention', () => {
    it('should never expose password or hash in register, login, or me endpoints', async () => {
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Security Check',
          email: 'security.check@test-auth.com',
          password: 'SecretPassword999!',
          role: 'customer',
        });

      expect(registerRes.body.data.user.password).toBeUndefined();

      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'security.check@test-auth.com',
          password: 'SecretPassword999!',
        });

      expect(loginRes.body.data.user.password).toBeUndefined();

      const meRes = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${loginRes.body.data.token}`);

      expect(meRes.body.data.user.password).toBeUndefined();
    });
  });
});
