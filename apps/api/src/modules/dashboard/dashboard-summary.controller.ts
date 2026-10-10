import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { getDashboardSummary } from './dashboard-summary.service.js';

export const getDashboardSummaryController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const data = await getDashboardSummary(req.user);

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Dashboard summary successfully retrieved.',
    data,
  });
};
