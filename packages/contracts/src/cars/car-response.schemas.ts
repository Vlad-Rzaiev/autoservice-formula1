import { createApiResponseSchema } from '../common/api-response.schema.js';
import { carDtoSchema, carListResponseDataSchema } from './car.schemas.js';

export const carsListResponseSchema = createApiResponseSchema(
  carListResponseDataSchema,
);

export const carResponseSchema = createApiResponseSchema(carDtoSchema);
