import { z } from 'zod';
import { createApiResponseSchema } from '../common/api-response.schema.js';
import { specializationDtoSchema } from './specialization.schemas.js';

export const specializationsResponseSchema = createApiResponseSchema(
  z.array(specializationDtoSchema),
);

export const specializationResponseSchema = createApiResponseSchema(
  specializationDtoSchema,
);
