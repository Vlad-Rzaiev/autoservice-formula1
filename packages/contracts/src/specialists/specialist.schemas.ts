import { z } from 'zod';
import { supportedLocales } from '../common/locale.js';
import { MechanicDto } from './specialist.dto.js';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

const mechanicNameDtoSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
});

const mechanicTranslationDtoSchema = z.object({
  description: z.string().trim().min(1),
});

const mechanicCertificateDtoSchema = z.object({
  name: z.string().trim().min(1),
  title: z.string().trim().min(1),
  issuer: z.string().trim().min(1),
  issuedAt: z.string().trim().min(1),
  expiresAt: z.string().trim().min(1).nullable(),
  certificateNumber: z.string().trim().min(1),
});

export const mechanicDtoSchema = z.object({
  _id: z.string().min(1),
  name: z.record(z.enum(supportedLocales), mechanicNameDtoSchema),
  photo: z.object({
    url: z.string().min(1),
  }),
  specializationIds: z.array(z.string().min(1)),
  workDirectionIds: z.array(z.string().min(1)),
  translations: z.record(
    z.enum(supportedLocales),
    mechanicTranslationDtoSchema,
  ),
  experienceYears: z.number().int().positive(),
  certificates: z.array(mechanicCertificateDtoSchema),
  featured: z.boolean(),
  isActive: z.boolean(),
  sortOrder: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}) satisfies z.ZodType<MechanicDto>;

const createMechanicBaseSchema = mechanicDtoSchema.omit({
  _id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

export const createMechanicSchema = z.strictObject({
  ...createMechanicBaseSchema.shape,
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type CreateMechanicInput = z.infer<typeof createMechanicSchema>;

export const getMechanicByIdSchema = z.object({
  mechanicId: mongoObjectIdSchema,
});
