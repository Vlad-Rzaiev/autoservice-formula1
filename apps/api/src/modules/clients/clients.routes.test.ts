import bcrypt from 'bcrypt';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../../app.js';
import { UserCollection } from '../user/user.model.js';

const getClientAccessToken = async (): Promise<string> => {
  const password = 'TestPassword123!';

  await UserCollection.create({
    userId: '2',
    firstName: 'Test',
    lastName: 'Client',
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: 'client@test.com',
    emailVerified: true,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'client',
    isActive: true,
  });

  const app = createApp();

  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'client@test.com',
      password,
    })
    .expect(200);

  return response.body.data.accessToken;
};

const getManagerAccessToken = async (): Promise<string> => {
  const password = 'TestPassword123!';

  await UserCollection.create({
    userId: '3',
    firstName: 'Test',
    lastName: 'Manager',
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: 'manager@test.com',
    emailVerified: true,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'manager',
    isActive: true,
  });

  const app = createApp();

  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'manager@test.com',
      password,
    })
    .expect(200);

  return response.body.data.accessToken;
};

const getMechanicAccessToken = async (): Promise<string> => {
  const password = 'TestPassword123!';

  await UserCollection.create({
    userId: '4',
    firstName: 'Test',
    lastName: 'Mechanic',
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: 'mechanic@test.com',
    emailVerified: true,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'mechanic',
    isActive: true,
  });

  const app = createApp();

  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'mechanic@test.com',
      password,
    })
    .expect(200);

  return response.body.data.accessToken;
};

const getOwnerAccessToken = async (): Promise<string> => {
  const password = 'TestPassword123!';

  await UserCollection.create({
    userId: '1',
    firstName: 'Test',
    lastName: 'Owner',
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: 'owner@test.com',
    emailVerified: true,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'owner',
    isActive: true,
  });

  const app = createApp();

  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'owner@test.com',
      password,
    })
    .expect(200);

  return response.body.data.accessToken;
};

describe('GET /api/v1/clients', () => {
  it('returns 401 when the user is not authenticated', async () => {
    const app = createApp();

    await request(app).get('/api/v1/clients').expect(401);
  });

  it('returns 403 when the user is a client', async () => {
    const accessToken = await getClientAccessToken();
    const app = createApp();

    await request(app)
      .get('/api/v1/clients')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
  });

  it('returns 200 when the user is a manager', async () => {
    const accessToken = await getManagerAccessToken();
    const app = createApp();

    await request(app)
      .get('/api/v1/clients')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('returns the clients for an authorized manager', async () => {
    const accessToken = await getManagerAccessToken();

    await UserCollection.create([
      {
        userId: '10',
        firstName: 'John',
        lastName: 'Doe',
        photo: null,
        gender: null,
        birthDate: null,
        phone: '+48123456789',
        email: 'john@test.com',
        emailVerified: true,
        passwordHash: 'hashed-password',
        role: 'client',
        isActive: true,
      },
      {
        userId: '11',
        firstName: 'Jane',
        lastName: 'Smith',
        photo: null,
        gender: null,
        birthDate: null,
        phone: '+48987654321',
        email: 'jane@test.com',
        emailVerified: true,
        passwordHash: 'hashed-password',
        role: 'client',
        isActive: true,
      },
    ]);

    const app = createApp();

    const response = await request(app)
      .get('/api/v1/clients')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.items).toHaveLength(2);

    expect(response.body.data.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: '10',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          role: 'client',
        }),
        expect.objectContaining({
          userId: '11',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@test.com',
          role: 'client',
        }),
      ]),
    );
  });

  it('returns paginated clients', async () => {
    const accessToken = await getManagerAccessToken();

    await UserCollection.create(
      Array.from({ length: 3 }, (_, index) => ({
        userId: `${10 + index}`,
        firstName: `Client${index}`,
        lastName: 'Test',
        photo: null,
        gender: null,
        birthDate: null,
        phone: null,
        email: `client${index}@test.com`,
        emailVerified: true,
        passwordHash: 'hashed-password',
        role: 'client' as const,
        isActive: true,
      })),
    );

    const app = createApp();

    const response = await request(app)
      .get('/api/v1/clients?page=2&limit=2')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);

    expect(response.body.data.pagination).toEqual({
      page: 2,
      limit: 2,
      totalItems: 3,
      totalPages: 2,
    });
  });

  it('returns clients matching the search query', async () => {
    const accessToken = await getManagerAccessToken();

    await UserCollection.create([
      {
        userId: '10',
        firstName: 'John',
        lastName: 'Doe',
        photo: null,
        gender: null,
        birthDate: null,
        phone: '+48123456789',
        email: 'john@test.com',
        emailVerified: true,
        passwordHash: 'hashed-password',
        role: 'client',
        isActive: true,
      },
      {
        userId: '11',
        firstName: 'Jane',
        lastName: 'Smith',
        photo: null,
        gender: null,
        birthDate: null,
        phone: '+48987654321',
        email: 'jane@test.com',
        emailVerified: true,
        passwordHash: 'hashed-password',
        role: 'client',
        isActive: true,
      },
    ]);

    const app = createApp();

    const response = await request(app)
      .get('/api/v1/clients?search=john')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);

    expect(response.body.data.items[0]).toEqual(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        role: 'client',
      }),
    );

    expect(response.body.data.pagination).toEqual({
      page: 1,
      limit: 20,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('returns 400 for invalid query parameters', async () => {
    const accessToken = await getManagerAccessToken();
    const app = createApp();

    await request(app)
      .get('/api/v1/clients?limit=0')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);
  });

  it('returns 200 when the user is a mechanic', async () => {
    const accessToken = await getMechanicAccessToken();
    const app = createApp();

    await request(app)
      .get('/api/v1/clients')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('returns 200 when the user is an owner', async () => {
    const accessToken = await getOwnerAccessToken();
    const app = createApp();

    await request(app)
      .get('/api/v1/clients')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
