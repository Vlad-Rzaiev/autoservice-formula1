import { z } from 'zod';
import { createApiResponseSchema } from '../common/api-response.schema.js';
import { repairDtoSchema } from './repair.schemas.js';
import { repairItemDtoSchema } from './repair-item.schemas.js';

export const repairListResponseDataSchema = z.object({
  items: z.array(repairDtoSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
});

export type RepairListResponseData = z.infer<
  typeof repairListResponseDataSchema
>;

export const repairResponseSchema = createApiResponseSchema(repairDtoSchema);

export const repairsListResponseSchema = createApiResponseSchema(
  repairListResponseDataSchema,
);

export const repairItemResponseSchema =
  createApiResponseSchema(repairItemDtoSchema);

export const repairItemsListResponseDataSchema = z.object({
  items: z.array(repairItemDtoSchema),
});

export const repairItemsListResponseSchema = createApiResponseSchema(
  repairItemsListResponseDataSchema,
);
