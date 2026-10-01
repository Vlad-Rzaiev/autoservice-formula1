import { createApiResponseSchema } from '../common/api-response.schema.js';

import { clientListResponseDataSchema } from './client.schemas.js';

export const clientListResponseSchema = createApiResponseSchema(
  clientListResponseDataSchema,
);
