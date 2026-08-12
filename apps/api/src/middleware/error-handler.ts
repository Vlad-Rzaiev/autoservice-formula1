import type { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';
import { MongoServerError } from 'mongodb';
import { sendApiError } from '../utils/send-api-error.js';

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

function getErrorDetails(error: unknown): unknown {
  if (typeof error === 'object' && error !== null && 'details' in error) {
    return error.details;
  }

  return undefined;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof MongoServerError && err.code === 11000) {
    const duplicateFields = Object.keys(err.keyValue ?? {});
    const duplicateField = duplicateFields[0] ?? 'field';
    const duplicateValue = err.keyValue?.[duplicateField];

    sendApiError(res, {
      status: 409,
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
    const errorDetails = getErrorDetails(err);

    sendApiError(res, {
      status: err.statusCode,
      code: errorCode,
      message: err.message,
      details: errorDetails,
      requestId: req.id,
    });

    return;
  }

  req.log.error({ err }, 'Unhandled request error');

  sendApiError(res, {
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong.',
    requestId: req.id,
  });
};
