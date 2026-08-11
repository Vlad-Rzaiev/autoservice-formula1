import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from './app.js';

describe('CORS', () => {
  it('allows requests without an Origin header', async () => {
    const app = createApp();

    const response = await request(app)
      .get('/api/v1/unknown-route')
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      success: false,
      code: 'ROUTE_NOT_FOUND',
    });
  });

  it('allows a configured origin', async () => {
    const app = createApp();

    const response = await request(app)
      .get('/api/v1/unknown-route')
      .set('Origin', 'http://localhost:3000')
      .expect(404);

    expect(response.headers['access-control-allow-origin']).toBe(
      'http://localhost:3000',
    );

    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('rejects a disallowed origin with 403', async () => {
    const app = createApp();

    const response = await request(app)
      .get('/api/v1/unknown-route')
      .set('Origin', 'https://evil.example.com')
      .expect(403);

    expect(response.body).toMatchObject({
      status: 403,
      success: false,
      code: 'CORS_ORIGIN_NOT_ALLOWED',
      message: 'Origin is not allowed by CORS',
    });

    expect(response.body.requestId).toEqual(expect.any(String));
  });

  it('allows a preflight request from a configured origin', async () => {
    const app = createApp();

    const response = await request(app)
      .options('/api/v1/services')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'GET')
      .expect(204);

    expect(response.headers['access-control-allow-origin']).toBe(
      'http://localhost:3000',
    );

    expect(response.headers['access-control-allow-credentials']).toBe('true');

    expect(response.headers['access-control-allow-methods']).toContain('GET');
  });

  it('rejects a preflight request from a disallowed origin', async () => {
    const app = createApp();

    const response = await request(app)
      .options('/api/v1/services')
      .set('Origin', 'https://evil.example.com')
      .set('Access-Control-Request-Method', 'GET')
      .expect(403);

    expect(response.body).toMatchObject({
      status: 403,
      success: false,
      code: 'CORS_ORIGIN_NOT_ALLOWED',
    });
  });
});
