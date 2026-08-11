import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from './app.js';

describe('request id', () => {
  it('generates a request id when the request does not provide one', async () => {
    const app = createApp();

    const response = await request(app)
      .get('/api/v1/unknown-route')
      .expect(404);

    const responseRequestId = response.headers['x-request-id'];

    expect(responseRequestId).toEqual(expect.any(String));

    expect(response.body.requestId).toBe(responseRequestId);
  });

  it('preserves an incoming x-request-id', async () => {
    const app = createApp();

    const requestId = 'test-request-id-123';

    const response = await request(app)
      .get('/api/v1/unknown-route')
      .set('x-request-id', requestId)
      .expect(404);

    expect(response.headers['x-request-id']).toBe(requestId);

    expect(response.body.requestId).toBe(requestId);
  });

  it('returns the standardized response for an unknown route', async () => {
    const app = createApp();

    const response = await request(app)
      .get('/api/v1/unknown-route')
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      success: false,
      code: 'ROUTE_NOT_FOUND',
      message: 'Route Not Found.',
      requestId: expect.any(String),
    });
  });
});
