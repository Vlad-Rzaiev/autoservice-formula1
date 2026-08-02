import { z } from 'zod';

export const serviceSlugSchema = z
  .string()
  .trim()
  .min(1, 'Service slug is required')
  .max(100, 'Service slug must contain at most 100 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Service slug has an invalid format');

export const getServiceBySlugParamsSchema = z.object({
  serviceSlug: serviceSlugSchema,
});

export type GetServiceBySlugParams = z.infer<
  typeof getServiceBySlugParamsSchema
>;
