import type { RequestHandler } from 'express';
import { sendApiError } from '../utils/send-api-error.js';

export const notFoundHandler: RequestHandler = (req, res) => {
  sendApiError(res, {
    status: 404,
    code: 'ROUTE_NOT_FOUND',
    message: 'Route Not Found.',
    requestId: req.id,
  });
};
