import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { dashboardSummaryQuerySchema } from '@autoservice/contracts';
import { getDashboardSummary } from './dashboard-summary.service.js';

export const getDashboardSummaryController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const validationResult = dashboardSummaryQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid query parameters', {
      details: validationResult.error.flatten(),
    });
  }

  const data = await getDashboardSummary(req.user, validationResult.data);

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Dashboard summary successfully retrieved.',
    data,
  });
};
