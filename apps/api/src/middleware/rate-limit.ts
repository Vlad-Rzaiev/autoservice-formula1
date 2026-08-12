import {
  rateLimit,
  type RateLimitExceededEventHandler,
} from 'express-rate-limit';
import createHttpError from 'http-errors';

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const PUBLIC_API_RATE_LIMIT = 300;
const AUTH_RATE_LIMIT = 10;

const rateLimitErrorHandler: RateLimitExceededEventHandler = (
  _req,
  _res,
  next,
) => {
  next(
    createHttpError(429, 'Too many requests. Please try again later.', {
      code: 'RATE_LIMIT_EXCEEDED',
    }),
  );
};

export const publicApiRateLimit = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: PUBLIC_API_RATE_LIMIT,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  identifier: 'public-api',
  handler: rateLimitErrorHandler,
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: AUTH_RATE_LIMIT,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  identifier: 'auth',
  handler: rateLimitErrorHandler,
});
