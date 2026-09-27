/**
 * cors.test.js
 * Verifies CORS security behavior and origin acceptance/rejection.
 */

const request = require('supertest');
const app = require('../src/app');

describe('CORS and Security Headers', () => {
  it('should accept requests from local frontend origin http://localhost:5173', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'http://localhost:5173');

    expect(res.statusCode).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('should accept requests from deployed frontend origin https://hunarhub-hazel.vercel.app', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'https://hunarhub-hazel.vercel.app');

    expect(res.statusCode).toBe(200);
    expect(res.headers['access-control-allow-origin']).toBe('https://hunarhub-hazel.vercel.app');
  });

  it('should not allow requests from unauthorized origin', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'https://malicious-site.example.com');

    // CORS middleware invokes next(Error) or does not set Access-Control-Allow-Origin
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
    // Central error handler catches CORS error with 500 status code
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it('should include Helmet standard security headers', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.headers).toHaveProperty('x-dns-prefetch-control');
    expect(res.headers).toHaveProperty('x-content-type-options', 'nosniff');
  });
});
