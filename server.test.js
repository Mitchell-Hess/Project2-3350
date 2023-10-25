const request = require('supertest');
const express = require('express');
const app = require('./server');

describe('API Endpoints', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000); // Use a different port for testing
  });

  afterAll((done) => {
    server.close(done);
  });

  /*
  test('should insert a key into the database', async () => {
    const key = 'your-test-key';
    const expiration = Date.now() + 3600; // Set the expiration time
    const result = await dbOperations.insertKey(key, expiration);
    expect(result).toBe(true); // Verify that the insertion was successful
  });
  
  test('should retrieve valid keys from the database', async () => {
    const validKeys = await dbOperations.getValidKeys();
    expect(validKeys).toEqual(expect.arrayContaining([keyPair.toPEM(true)])); // Ensure the retrieved key is valid
  });
  
  test('should retrieve expired keys from the database', async () => {
    const expiredKeys = await dbOperations.getExpiredKeys();
    expect(expiredKeys).toEqual(expect.arrayContaining([expiredKeyPair.toPEM(true)])); // Ensure the retrieved key is expired
  });
  */

  test('should return 405 Method Not Allowed for non-POST requests to /auth', async () => {
    const response = await request(app).get('/auth');
    expect(response.statusCode).toBe(405);
    expect(response.text).toBe('Method Not Allowed');
  });

  test('should return a JWT token for POST request to /auth', async () => {
    const response = await request(app).post('/auth');
    expect(response.statusCode).toBe(200);
    // Add more specific assertions for the token as needed
  });

  test('should return an expired JWT token for POST request to /auth?expired=true', async () => {
    const response = await request(app).post('/auth?expired=true');
    expect(response.statusCode).toBe(200);
    // Add more specific assertions for the expired token as needed
  });

  test('should return 405 Method Not Allowed for non-GET requests to /.well-known/jwks.json', async () => {
    const response = await request(app).post('/.well-known/jwks.json');
    expect(response.statusCode).toBe(405);
    expect(response.text).toBe('Method Not Allowed');
  });

  test('should return JSON containing valid keys for GET request to /.well-known/jwks.json', async () => {
    const response = await request(app).get('/.well-known/jwks.json');
    expect(response.statusCode).toBeGreaterThanOrEqual(200);;
    expect(response.body).toHaveProperty('keys');
    // Add more specific assertions for the JSON response as needed
  });

  test('should start the server and listen on the specified port', (done) => {
    const port = 3000; // The expected port
    const server = app.listen(port, () => {
      server.close(() => {
        done(); // Ensure the server starts and closes without errors
      });
    });
  });

    test('should start the server and listen on an available port', (done) => {
        const server = app.listen(0, () => {
            const port = server.address().port;
            server.close(() => {
            done();
            });
        });
    });
   
});
