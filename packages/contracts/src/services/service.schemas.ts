import { z } from 'zod';

import { supportedLocales } from '../common/locale.js';
import { serviceCategories } from './service.constants.js';
import type { ServiceDto } from './service.dto.js';
import { iconKeys } from '../lib/constants.js';

export const serviceSlugSchema = z
  .string()
  .trim()
  .min(1, 'Slug is required.')
  .max(50, 'Slug must contain no more than 50 characters.')
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug must contain only lowercase letters, numbers, and single hyphens.',
  );

export const serviceTranslationDtoSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

export const serviceDtoSchema = z.object({
  _id: z.string().min(1),
  slug: serviceSlugSchema,
  category: z.enum(serviceCategories),
  iconKey: z.enum(iconKeys),
  featured: z.boolean(),
  sortOrder: z.number().int().positive(),
  isActive: z.boolean(),
  translations: z.record(z.enum(supportedLocales), serviceTranslationDtoSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}) satisfies z.ZodType<ServiceDto>;

const createServiceBaseSchema = serviceDtoSchema.omit({
  _id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

export const createServiceSchema = z.strictObject({
  ...createServiceBaseSchema.shape,
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
