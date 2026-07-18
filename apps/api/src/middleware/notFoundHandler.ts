import type { RequestHandler } from 'express';

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: 'Route Not Found.',
  });
};
