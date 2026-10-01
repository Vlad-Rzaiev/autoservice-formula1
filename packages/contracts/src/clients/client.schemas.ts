import z from 'zod';
import { userDtoSchema } from '../auth/user.schemas.js';

export const clientDtoSchema = userDtoSchema.extend({
  role: z.literal('client'),
});

export type ClientDto = z.infer<typeof clientDtoSchema>;

export const clientListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().max(100).optional(),
});

export type ClientListQuery = z.infer<typeof clientListQuerySchema>;

export const clientListPaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export type ClientListPagination = z.infer<typeof clientListPaginationSchema>;

export const clientListResponseDataSchema = z.object({
  items: z.array(clientDtoSchema),
  pagination: clientListPaginationSchema,
});

export type ClientListResponseData = z.infer<
  typeof clientListResponseDataSchema
>;
