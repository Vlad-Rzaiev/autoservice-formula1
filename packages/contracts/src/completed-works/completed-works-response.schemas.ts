import { z } from 'zod';

import { createApiResponseSchema } from '../common/api-response.schema.js';
import { completedWorkDtoSchema } from './completed-works.schemas.js';

export const completedWorksResponseSchema = createApiResponseSchema(
  z.array(completedWorkDtoSchema),
);

export const completedWorkResponseSchema = createApiResponseSchema(
  completedWorkDtoSchema,
);
