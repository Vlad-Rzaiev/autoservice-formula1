import { z } from 'zod';
import { supportedLocales } from '../common/locale.js';
import { SpecializationDto } from './specialization.dto.js';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const specializationTranslationDtoSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

export const specializationDtoSchema = z.object({
  _id: z.string().min(1),
  slug: z.string().min(1),
  translations: z.record(
    z.enum(supportedLocales),
    specializationTranslationDtoSchema,
  ),
  isActive: z.boolean(),
  sortOrder: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}) satisfies z.ZodType<SpecializationDto>;

export const getSpecializationByIdSchema = z.object({
  specializationId: mongoObjectIdSchema,
});
