import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import createHttpError from 'http-errors';

export function validateBody<TBody>(schema: ZodType<TBody>): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(
        createHttpError(400, 'Invalid request body', {
          details: result.error.flatten(),
        }),
      );
      return;
    }

    req.body = result.data;
    next();
  };
}
