import type { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (createHttpError.isHttpError(err)) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      success: false,
      message: err.message,
    });

    return;
  }

  const errorMessage =
    err instanceof Error ? err.message : 'Unknown server error';

  res.status(500).json({
    status: 500,
    success: false,
    message: 'Something went wrong.',
    ...(process.env.NODE_ENV === 'development' && {
      error: errorMessage,
    }),
  });
};
