import { z } from 'zod';

import { createApiResponseSchema } from '../common/api-response.schema.js';
import { mechanicDtoSchema } from './mechanic.schemas.js';

export const mechanicsResponseSchema = createApiResponseSchema(
  z.array(mechanicDtoSchema),
);

export const mechanicResponseSchema =
  createApiResponseSchema(mechanicDtoSchema);
