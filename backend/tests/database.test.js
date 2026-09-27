/**
 * database.test.js
 * Basic test verifying database configuration and connection handling.
 * Does not require external services or domain models.
 */

const { connectDB, disconnectDB } = require('../src/config/database');

describe('Database Configuration', () => {
  const originalMongoUri = process.env.MONGODB_URI;

  afterEach(() => {
    process.env.MONGODB_URI = originalMongoUri;
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it('should export connectDB and disconnectDB functions', () => {
    expect(typeof connectDB).toBe('function');
    expect(typeof disconnectDB).toBe('function');
  });

  it('should gracefully handle missing MONGODB_URI without throwing an unhandled exception', async () => {
    delete process.env.MONGODB_URI;
    await expect(connectDB()).resolves.toBeUndefined();
  });
});
