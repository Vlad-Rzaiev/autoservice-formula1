import { z } from 'zod';

export const dashboardSummarySchema = z.object({
  carsCount: z.number().int().nonnegative(),
  appointmentsCount: z.number().int().nonnegative(),
  activeRepairsCount: z.number().int().nonnegative(),
  completedRepairsCount: z.number().int().nonnegative(),
});

export type DashboardSummaryDto = z.infer<typeof dashboardSummarySchema>;
