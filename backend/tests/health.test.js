/**
 * health.test.js
 * Basic test verifying that the Express application and health endpoint respond as expected.
 */

const request = require('supertest');
const app = require('../src/app');

describe('GET /api/health', () => {
  it('should respond with 200 and return API health status', async () => {
    const res = await request(app).get('/api/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'HunarHub API is running');
    expect(res.body).toHaveProperty('database');
    expect(res.body.database).toHaveProperty('status');
  });

  it('should respond with 200 on root route GET /', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Welcome to HunarHub API');
  });
});
