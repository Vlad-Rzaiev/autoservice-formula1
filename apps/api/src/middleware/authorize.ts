import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import type { UserRole } from '@autoservice/contracts';

export const authorize = (...allowedRoles: UserRole[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) {
      next(createHttpError(401, 'Authentication is required.'));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(
        createHttpError(
          403,
          'You do not have permission to perform this action.',
        ),
      );
      return;
    }

    next();
  };
};
