import type { ParamsDictionary } from 'express-serve-static-core';
import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import type { ZodType } from 'zod';

export const validateParams = <ValidatedParams extends ParamsDictionary>(
  schema: ZodType<ValidatedParams>,
): RequestHandler<ValidatedParams> => {
  return (request, _response, next): void => {
    const validationResult = schema.safeParse(request.params);

    if (!validationResult.success) {
      next(
        createHttpError(400, 'Invalid route parameters', {
          details: validationResult.error.flatten(),
        }),
      );

      return;
    }

    Object.assign(request.params, validationResult.data);

    next();
  };
};
