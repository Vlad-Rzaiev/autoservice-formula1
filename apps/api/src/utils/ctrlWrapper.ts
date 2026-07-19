import { RequestHandler } from 'express';

export const ctrlWrapper = <
  Params,
  ResponseBody,
  RequestBody,
  RequestQuery,
  Locals extends Record<string, unknown>,
>(
  controller: RequestHandler<
    Params,
    ResponseBody,
    RequestBody,
    RequestQuery,
    Locals
  >,
): RequestHandler<Params, ResponseBody, RequestBody, RequestQuery, Locals> => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
};
