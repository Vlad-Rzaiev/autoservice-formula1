import { createApiResponseSchema } from '../common/api-response.schema.js';

import {
  clientDtoSchema,
  clientListResponseDataSchema,
} from './client.schemas.js';

export const clientListResponseSchema = createApiResponseSchema(
  clientListResponseDataSchema,
);

export const clientResponseSchema = createApiResponseSchema(clientDtoSchema);
