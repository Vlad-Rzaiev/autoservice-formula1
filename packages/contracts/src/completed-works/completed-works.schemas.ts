import { z } from 'zod';

import { supportedLocales } from '../common/locale.js';
import { completedWorksCategoriesSlug } from './completed-works.constants.js';
import { CompletedWorkDto } from './completed-works.dto.js';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const completedWorkSlugSchema = z
  .string()
  .trim()
  .min(1, 'Slug is required.')
  .max(100, 'Slug must contain no more than 100 characters.')
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Slug must contain only lowercase letters, numbers, and single hyphens.',
  );

export const completedWorkCarSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().positive(),
});

export const completedWorkTranslationsSchema = z.object({
  customerRequest: z.string().min(1),
  diagnosis: z.string().min(1),
  performedWork: z
    .array(z.string().trim().min(1, 'Specify the work performed.'))
    .min(1, 'Add at least one completed job'),
  result: z.string().min(1),
});

export const completedWorkImagesSchema = z.object({
  before: z.array(z.string().min(1)).min(1),
  after: z.array(z.string().min(1)).min(1),
});

export const completedWorkDtoSchema = z.object({
  _id: z.string().min(1),
  slug: completedWorkSlugSchema,
  car: completedWorkCarSchema,
  category: z.object({
    slug: z.enum(completedWorksCategoriesSlug),
  }),
  translations: z.record(
    z.enum(supportedLocales),
    completedWorkTranslationsSchema,
  ),
  images: completedWorkImagesSchema,
  featured: z.boolean(),
  sortOrder: z.number().int().positive(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}) satisfies z.ZodType<CompletedWorkDto>;

const createCompletedWorkBaseSchema = completedWorkDtoSchema.omit({
  _id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

export const createCompletedWorkSchema = z.strictObject({
  ...createCompletedWorkBaseSchema.shape,
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type CreateCompletedWorkInput = z.infer<
  typeof createCompletedWorkSchema
>;

export const getCompletedWorkByIdParamsSchema = z.object({
  completedWorkId: mongoObjectIdSchema,
});
