import bcrypt from 'bcrypt';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import type { UserRole } from '@autoservice/contracts';
import { createApp } from '../../app.js';
import { UserCollection } from '../user/user.model.js';

const password = 'TestPassword123!';

const getAccessToken = async (role: UserRole): Promise<string> => {
  const email = `dashboard-${role}@test.com`;

  await UserCollection.create({
    userId: `dashboard-${role}`,
    firstName: 'Test',
    lastName: role,
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email,
    emailVerified: true,
    passwordHash: await bcrypt.hash(password, 10),
    role,
    isActive: true,
  });

  const response = await request(createApp())
    .post('/api/v1/auth/login')
    .send({ email, password })
    .expect(200);

  return response.body.data.accessToken as string;
};

const auth = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

describe('GET /api/v1/dashboard/summary', () => {
  it('returns 401 when the user is not authenticated', async () => {
    const response = await request(createApp())
      .get('/api/v1/dashboard/summary')
      .expect(401);

    expect(response.body.success).toBe(false);
  });

  it.each(['client', 'mechanic', 'manager', 'owner'] as const)(
    'returns dashboard summary for an authenticated %s',
    async (role) => {
      const accessToken = await getAccessToken(role);

      const response = await request(createApp())
        .get('/api/v1/dashboard/summary')
        .set(auth(accessToken))
        .expect(200);

      expect(response.body).toEqual({
        status: 200,
        success: true,
        message: 'Dashboard summary successfully retrieved.',
        data: {
          carsCount: 0,
          appointmentsCount: 0,
          activeRepairsCount: 0,
          completedRepairsCount: 0,
        },
      });
    },
  );

  it('returns only numeric summary fields', async () => {
    const accessToken = await getAccessToken('client');

    const response = await request(createApp())
      .get('/api/v1/dashboard/summary')
      .set(auth(accessToken))
      .expect(200);

    const { data } = response.body;

    expect(data).toEqual({
      carsCount: expect.any(Number),
      appointmentsCount: expect.any(Number),
      activeRepairsCount: expect.any(Number),
      completedRepairsCount: expect.any(Number),
    });

    expect(Object.keys(data).sort()).toEqual(
      [
        'carsCount',
        'appointmentsCount',
        'activeRepairsCount',
        'completedRepairsCount',
      ].sort(),
    );
  });

  it('does not expose information about other clients', async () => {
    const accessToken = await getAccessToken('client');

    const response = await request(createApp())
      .get('/api/v1/dashboard/summary')
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.data).toEqual({
      carsCount: 0,
      appointmentsCount: 0,
      activeRepairsCount: 0,
      completedRepairsCount: 0,
    });
  });
});
