import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import { verifyAccessToken } from '../utils/jwt.js';

export const authenticate: RequestHandler = async (req, _res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    next(createHttpError(401, 'Authorization header is required.'));
    return;
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    next(createHttpError(401, 'Invalid authorization header.'));
    return;
  }

  try {
    const payload = await verifyAccessToken(token);

    req.user = payload;

    next();
  } catch {
    next(createHttpError(401, 'Invalid or expired access token.'));
  }
};
