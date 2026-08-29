import { z } from 'zod';

import { supportedLocales } from '../common/locale.js';
import { serviceCategories } from './service.constants.js';
import type { ServiceDto } from './service.dto.js';
import { iconKeys } from '../lib/constants.js';
import { specializationDtoSchema } from '../specializations/specialization.schemas.js';
import { workDirectionDtoSchema } from '../work-directions/work-direction.schemas.js';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

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
  specializationIds: z.array(specializationDtoSchema),
  workDirectionIds: z.array(workDirectionDtoSchema),
  category: z.enum(serviceCategories),
  iconKey: z.enum(iconKeys),
  featured: z.boolean(),
  sortOrder: z.number().int().positive(),
  isActive: z.boolean(),
  translations: z.record(z.enum(supportedLocales), serviceTranslationDtoSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}) satisfies z.ZodType<ServiceDto>;

export const createServiceSchema = z
  .object({
    slug: serviceSlugSchema,
    specializationIds: z.array(mongoObjectIdSchema),
    workDirectionIds: z.array(mongoObjectIdSchema),
    category: z.enum(serviceCategories),
    iconKey: z.enum(iconKeys),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    translations: z.record(
      z.enum(supportedLocales),
      serviceTranslationDtoSchema,
    ),
  })
  .strict();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
