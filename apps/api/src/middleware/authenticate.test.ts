import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../app.js';

describe('authenticate middleware', () => {
  it('returns 401 when the authorization header is missing', async () => {
    const app = createApp();

    const response = await request(app).post('/api/v1/services').expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'Authorization header is required.',
    });
  });

  it('returns 401 when the authorization header is invalid', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/services')
      .set('Authorization', 'Basic some-token')
      .expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'Invalid authorization header.',
    });
  });

  it('returns 401 when the bearer token is missing', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/services')
      .set('Authorization', 'Bearer')
      .expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'Invalid authorization header.',
    });
  });

  it('returns 401 when the access token is invalid', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/services')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'Invalid or expired access token.',
    });
  });

  it('allows the request with a valid access token', async () => {
    const app = createApp();

    const password = 'TestPassword123!';

    await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Vlad',
        lastName: 'Rzaiev',
        email: 'auth-test@example.com',
        password,
      })
      .expect(201);

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'auth-test@example.com',
        password,
      })
      .expect(200);

    const accessToken = loginResponse.body.data.accessToken;

    const response = await request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        slug: 'engine-diagnostics',
        specializationIds: [],
        workDirectionIds: [],
        category: 'diagnostics',
        iconKey: 'scan-search',
        translations: {
          uk: {
            title: 'Діагностика двигуна',
            description: 'Комплексна діагностика двигуна.',
          },
          en: {
            title: 'Engine diagnostics',
            description: 'Comprehensive engine diagnostics.',
          },
          pl: {
            title: 'Diagnostyka silnika',
            description: 'Kompleksowa diagnostyka silnika.',
          },
        },
      })
      .expect(403);

    expect(response.body).toMatchObject({
      status: 403,
      success: false,
    });
  });
});
