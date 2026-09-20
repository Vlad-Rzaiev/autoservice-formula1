import bcrypt from 'bcrypt';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

import { createApp } from '../../app.js';
import { UserCollection } from './user.model.js';
import { SessionCollection } from '../sessions/session.model.js';
import { hashToken } from '../../utils/token.js';

vi.mock('../email-verifications/email-verification.mail.js', () => ({
  sendEmailVerificationEmail: vi.fn().mockResolvedValue(undefined),
}));

describe('POST /api/v1/auth/login', () => {
  it('logs in a user, creates a session and sets auth cookies', async () => {
    const app = createApp();

    const password = 'TestPassword123!';
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: 'male',
      birthDate: null,
      phone: null,
      email: 'test@example.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password,
      })
      .expect(200);

    expect(response.body).toMatchObject({
      status: 200,
      success: true,
      message: 'User successfully logged in.',
    });

    expect(response.body.data.accessToken).toEqual(expect.any(String));

    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('refreshToken='),
        expect.stringContaining('sessionId='),
      ]),
    );

    const session = await SessionCollection.findOne({
      userId: user._id,
    }).lean();

    expect(session).not.toBeNull();
    expect(session?.accessTokenHash).toEqual(expect.any(String));
    expect(session?.refreshTokenHash).toEqual(expect.any(String));

    const cookies = response.headers['set-cookie'];

    if (!Array.isArray(cookies)) {
      throw new Error('Expected set-cookie header to be an array.');
    }

    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );

    expect(refreshTokenCookie).toEqual(expect.any(String));

    const refreshToken = refreshTokenCookie?.split(';')[0].split('=')[1];

    expect(refreshToken).toEqual(expect.any(String));

    expect(session?.accessTokenHash).toBe(
      hashToken(response.body.data.accessToken),
    );

    expect(session?.refreshTokenHash).toBe(hashToken(refreshToken!));
  });

  it('returns 401 when the password is incorrect', async () => {
    const app = createApp();
    const password = 'TestPassword123!';
    const passwordHash = await bcrypt.hash(password, 10);

    await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: 'male',
      birthDate: null,
      phone: null,
      email: 'test@example.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'WrongPassword123!',
      })
      .expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'Invalid email or password.',
    });
  });

  it('returns 401 when the user does not exist', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'unknown@example.com',
        password: 'TestPassword123!',
      })
      .expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'Invalid email or password.',
    });
  });
});

describe('POST /api/v1/auth/refresh', () => {
  it('refreshes the access token using the refresh token cookie', async () => {
    const app = createApp();
    const password = 'TestPassword123!';
    const passwordHash = await bcrypt.hash(password, 10);

    await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: 'male',
      birthDate: null,
      phone: null,
      email: 'test@example.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password,
      })
      .expect(200);

    const cookies = loginResponse.headers['set-cookie'];

    if (!Array.isArray(cookies)) {
      throw new Error('Expected set-cookie header to be an array.');
    }

    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );

    expect(refreshTokenCookie).toEqual(expect.any(String));

    const refreshResponse = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', refreshTokenCookie!)
      .expect(200);

    expect(refreshResponse.body).toMatchObject({
      status: 200,
      success: true,
      message: 'Access token successfully refreshed.',
    });

    expect(refreshResponse.body.data.accessToken).toEqual(expect.any(String));

    const refreshedCookies = refreshResponse.headers['set-cookie'];

    if (!Array.isArray(refreshedCookies)) {
      throw new Error('Expected set-cookie header to be an array.');
    }

    const newRefreshTokenCookie = refreshedCookies.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );

    expect(newRefreshTokenCookie).toEqual(expect.any(String));
    expect(newRefreshTokenCookie).not.toBe(refreshTokenCookie);

    await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', refreshTokenCookie!)
      .expect(401);
  });

  it('returns 401 when the refresh token is missing', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/auth/refresh')
      .expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'Refresh token is missing.',
    });
  });

  it('returns 401 when the user is inactive', async () => {
    const app = createApp();
    const password = 'TestPassword123!';
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: 'male',
      birthDate: null,
      phone: null,
      email: 'test@example.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password,
      })
      .expect(200);

    const cookies = loginResponse.headers['set-cookie'];

    if (!Array.isArray(cookies)) {
      throw new Error('Expected set-cookie header to be an array.');
    }

    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.startsWith('refreshToken='),
    );

    expect(refreshTokenCookie).toEqual(expect.any(String));

    user.isActive = false;
    await user.save();

    const response = await request(app)
      .post('/api/v1/auth/refresh')
      .set('Cookie', refreshTokenCookie!)
      .expect(401);

    expect(response.body).toMatchObject({
      status: 401,
      success: false,
      message: 'User is not available.',
    });
  });
});

describe('POST /api/v1/auth/logout', () => {
  it('logs out the user, deletes the session and clears auth cookies', async () => {
    const app = createApp();
    const password = 'TestPassword123!';
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: 'male',
      birthDate: null,
      phone: null,
      email: 'test@example.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password,
      })
      .expect(200);

    const cookies = loginResponse.headers['set-cookie'];

    if (!Array.isArray(cookies)) {
      throw new Error('Expected set-cookie header to be an array.');
    }

    expect(cookies).toEqual(
      expect.arrayContaining([
        expect.stringContaining('refreshToken='),
        expect.stringContaining('sessionId='),
      ]),
    );

    const sessionBeforeLogout = await SessionCollection.findOne({
      userId: user._id,
    }).lean();

    expect(sessionBeforeLogout).not.toBeNull();

    const logoutResponse = await request(app)
      .post('/api/v1/auth/logout')
      .set('Cookie', cookies)
      .expect(200);

    expect(logoutResponse.body).toMatchObject({
      status: 200,
      success: true,
      message: 'User successfully logged out.',
    });

    const sessionAfterLogout = await SessionCollection.findOne({
      userId: user._id,
    }).lean();

    expect(sessionAfterLogout).toBeNull();

    const clearedCookies = logoutResponse.headers['set-cookie'];

    expect(clearedCookies).toEqual(
      expect.arrayContaining([
        expect.stringContaining('refreshToken=;'),
        expect.stringContaining('sessionId=;'),
      ]),
    );
  });

  it('logs out successfully when the session cookie is missing', async () => {
    const app = createApp();

    const response = await request(app).post('/api/v1/auth/logout').expect(200);

    expect(response.body).toMatchObject({
      status: 200,
      success: true,
      message: 'User successfully logged out.',
    });
  });
});

describe('POST /api/v1/auth/register', () => {
  it('registers a new client user', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Vlad',
        lastName: 'Rzaiev',
        email: 'new@example.com',
        password: 'TestPassword123!',
        locale: 'en',
      })
      .expect(201);

    expect(response.body).toMatchObject({
      status: 201,
      success: true,
      message: 'User successfully registered.',
    });

    const user = await UserCollection.findOne({
      email: 'new@example.com',
    }).lean();

    expect(user).not.toBeNull();
    expect(user?.role).toBe('client');
    expect(user?.isActive).toBe(true);
    expect(user?.passwordHash).toEqual(expect.any(String));
    expect(user?.passwordHash).not.toBe('TestPassword123!');
  });

  it('returns 409 when the email is already registered', async () => {
    const app = createApp();

    await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Vlad',
        lastName: 'Rzaiev',
        email: 'existing@example.com',
        password: 'TestPassword123!',
        locale: 'en',
      })
      .expect(201);

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Another',
        lastName: 'User',
        email: 'existing@example.com',
        password: 'AnotherPassword123!',
        locale: 'en',
      })
      .expect(409);

    expect(response.body).toMatchObject({
      status: 409,
      success: false,
    });
  });

  it('returns 400 when the password does not meet the requirements', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Vlad',
        lastName: 'Rzaiev',
        email: 'invalid@example.com',
        password: 'weak',
      })
      .expect(400);

    expect(response.body).toMatchObject({
      status: 400,
      success: false,
    });

    const user = await UserCollection.findOne({
      email: 'invalid@example.com',
    }).lean();

    expect(user).toBeNull();
  });

  it('returns 400 when the email is missing', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        firstName: 'Vlad',
        lastName: 'Rzaiev',
        password: 'TestPassword123!',
      })
      .expect(400);

    expect(response.body).toMatchObject({
      status: 400,
      success: false,
    });

    const users = await UserCollection.find().lean();

    expect(users).toHaveLength(0);
  });
});
