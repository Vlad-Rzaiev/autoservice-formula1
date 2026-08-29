import { z } from 'zod';
import { supportedLocales } from '../common/locale.js';
import { WorkDirectionDto } from './work-direction.dto.js';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const workDirectionTranslationDtoSchema = z.object({
  title: z.string().trim().min(1),
});

export const workDirectionDtoSchema = z.object({
  _id: z.string().min(1),
  slug: z.string().min(1),
  translations: z.record(
    z.enum(supportedLocales),
    workDirectionTranslationDtoSchema,
  ),
  isActive: z.boolean(),
  sortOrder: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}) satisfies z.ZodType<WorkDirectionDto>;

export const getWorkDirectionByIdSchema = z.object({
  workDirectionId: mongoObjectIdSchema,
});
