import { z } from 'zod';
import { createApiResponseSchema } from '../common/api-response.schema.js';
import { workDirectionDtoSchema } from './work-direction.schemas.js';

export const workDirectionsResponseSchema = createApiResponseSchema(
  z.array(workDirectionDtoSchema),
);

export const workDirectionResponseSchema = createApiResponseSchema(
  workDirectionDtoSchema,
);
