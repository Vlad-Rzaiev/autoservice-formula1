export const TEN_MINUTES = 10 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
export const SESSION_ID_COOKIE_NAME = 'sessionId';

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: ONE_DAY,
  path: '/api/v1/auth',
};
