import { createApiResponseSchema } from '../common/api-response.schema.js';
import { dashboardSummarySchema } from './dashboard-summary.schemas.js';

export const dashboardSummaryResponseSchema = createApiResponseSchema(
  dashboardSummarySchema,
);
