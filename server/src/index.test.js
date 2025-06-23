// server/src/index.test.js

const request = require('supertest');
const app     = require('./index');  // this is the Express app

describe('API', () => {
  it('GET  /api/ → 200 Hello World!', async () => {
    const res = await request(app).get('/api/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World!');
  });

  it('OPTIONS /api/token → 204 + CORS headers', async () => {
    const res = await request(app)
      .options('/api/token')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'POST');

    expect(res.status).toBe(204);
    expect(res.headers['access-control-allow-origin'])
      .toBe('http://localhost:3000');
    expect(res.headers['access-control-allow-methods'])
      .toMatch(/POST/);
  });

  it('POST /api/token without auth → 401', async () => {
    const res = await request(app)
      .post('/api/token')
      .send({ foo: 'bar' });
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/Missing Authorization header/);
  });

  it('POST /api/chat without auth → 401', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ sessionId: 'x', message: 'hi' });
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/Missing Authorization header/);
  });
});
