import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Joi, { type ObjectSchema } from 'joi';

export const validateBody = <Body>(
  schema: ObjectSchema<Body>,
): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const validatedBody: Body = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = validatedBody;

      next();
    } catch (error: unknown) {
      if (Joi.isError(error)) {
        next(
          createHttpError(400, 'Bad Request', {
            errors: error.details,
          }),
        );

        return;
      }

      next(error);
    }
  };
};
