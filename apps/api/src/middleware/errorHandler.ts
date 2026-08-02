import type { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';
import { MongoServerError } from 'mongodb';

function getErrorCode(error: unknown): string | undefined {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return error.code;
  }

  return undefined;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof MongoServerError && err.code === 11000) {
    const duplicateFields = Object.keys(err.keyValue ?? {});
    const duplicateField = duplicateFields[0] ?? 'field';
    const duplicateValue = err.keyValue?.[duplicateField];

    res.status(409).json({
      status: 409,
      success: false,
      code: 'DUPLICATE_KEY',
      message: `A record with this ${duplicateField} already exists.`,
      details: {
        field: duplicateField,
        value: duplicateValue,
      },
      requestId: req.id,
    });

    return;
  }

  if (createHttpError.isHttpError(err)) {
    const errorCode = getErrorCode(err) ?? `HTTP_${err.statusCode}`;

    res.status(err.statusCode).json({
      status: err.statusCode,
      success: false,
      code: errorCode,
      message: err.message,
      details: err.details,
      requestId: req.id,
    });

    return;
  }

  req.log.error({ err }, 'Unhandled request error');

  res.status(500).json({
    status: 500,
    success: false,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong.',
    requestId: req.id,
  });
};
