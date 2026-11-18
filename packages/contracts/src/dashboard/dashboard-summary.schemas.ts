import { z } from 'zod';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const dashboardSummarySchema = z.object({
  carsCount: z.number().int().nonnegative(),
  appointmentsCount: z.number().int().nonnegative(),
  activeRepairsCount: z.number().int().nonnegative(),
  completedRepairsCount: z.number().int().nonnegative(),
});

export type DashboardSummaryDto = z.infer<typeof dashboardSummarySchema>;

export const dashboardSummaryQuerySchema = z.object({
  clientId: mongoObjectIdSchema.optional(),
});

export type DashboardSummaryQuery = z.infer<typeof dashboardSummaryQuerySchema>;
