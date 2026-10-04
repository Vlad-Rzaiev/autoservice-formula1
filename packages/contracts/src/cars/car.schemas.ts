import { z } from 'zod';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const bodyTypeSchema = z.enum([
  'sedan',
  'wagon',
  'hatchback',
  'coupe',
  'convertible',
  'suv',
  'crossover',
  'minivan',
  'van',
  'pickup',
  'other',
]);

export const fuelTypeSchema = z.enum([
  'petrol',
  'diesel',
  'hybrid',
  'plug_in_hybrid',
  'electric',
  'lpg',
  'cng',
  'hydrogen',
  'other',
]);

export const transmissionSchema = z.enum([
  'manual',
  'automatic',
  'semi_automatic',
  'cvt',
  'other',
]);

export type BodyType = z.infer<typeof bodyTypeSchema>;
export type FuelType = z.infer<typeof fuelTypeSchema>;
export type Transmission = z.infer<typeof transmissionSchema>;

export const carDtoSchema = z.object({
  _id: z.string(),
  ownerId: z.string(),

  brand: z.string(),
  model: z.string(),
  year: z.number().int(),

  licensePlate: z.string().nullable(),
  vin: z
    .string()
    .length(17)
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/),

  mileage: z.number().int().nonnegative().nullable(),
  photos: z.array(z.string().min(1)).default([]),

  generation: z.string().nullable(),
  bodyType: bodyTypeSchema.nullable(),
  fuelType: fuelTypeSchema.nullable(),
  transmission: transmissionSchema.nullable(),

  engine: z.string().nullable(),
  color: z.string().nullable(),

  registrationDate: z.string().datetime().nullable(),
  countryOfRegistration: z.string().nullable(),

  notes: z.string().nullable(),
  isActive: z.boolean(),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CarDto = z.infer<typeof carDtoSchema>;

export const carsListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().max(100).optional(),
  ownerId: mongoObjectIdSchema.optional(),
});

export type CarsListQuery = z.infer<typeof carsListQuerySchema>;

export const carListPaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalItems: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export type CarListPagination = z.infer<typeof carListPaginationSchema>;

export const carListResponseDataSchema = z.object({
  items: z.array(carDtoSchema),
  pagination: carListPaginationSchema,
});

export type CarListResponseData = z.infer<typeof carListResponseDataSchema>;

export const createCarSchema = z.object({
  ownerId: mongoObjectIdSchema,
  brand: z.string().trim().min(1),
  model: z.string().trim().min(1),
  year: z.number().int().min(1886),
  licensePlate: z.string().trim().min(1).nullable().default(null),
  vin: z
    .string()
    .trim()
    .length(17)
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/)
    .transform((value) => value.toUpperCase()),
  mileage: z.number().int().nonnegative().nullable().default(null),
  photos: z.array(z.string().min(1)).default([]),
  generation: z.string().trim().min(1).nullable().default(null),
  bodyType: bodyTypeSchema.nullable().default(null),
  fuelType: fuelTypeSchema.nullable().default(null),
  transmission: transmissionSchema.nullable().default(null),
  engine: z.string().trim().min(1).nullable().default(null),
  color: z.string().trim().min(1).nullable().default(null),
  registrationDate: z.string().datetime().nullable().default(null),
  countryOfRegistration: z.string().trim().min(1).nullable().default(null),
  notes: z.string().trim().min(1).nullable().default(null),
});

export type CreateCarInput = z.infer<typeof createCarSchema>;

export const updateCarSchema = z
  .object({
    brand: z.string().trim().min(1).optional(),
    model: z.string().trim().min(1).optional(),
    year: z.number().int().min(1886).optional(),
    licensePlate: z.string().trim().min(1).nullable().optional(),
    vin: z
      .string()
      .trim()
      .length(17)
      .regex(/^[A-HJ-NPR-Z0-9]{17}$/)
      .transform((value) => value.toUpperCase())
      .optional(),
    mileage: z.number().int().nonnegative().nullable().optional(),
    photos: z.array(z.string().min(1)).optional(),
    generation: z.string().trim().min(1).nullable().optional(),
    bodyType: bodyTypeSchema.nullable().optional(),
    fuelType: fuelTypeSchema.nullable().optional(),
    transmission: transmissionSchema.nullable().optional(),
    engine: z.string().trim().min(1).nullable().optional(),
    color: z.string().trim().min(1).nullable().optional(),
    registrationDate: z.string().datetime().nullable().optional(),
    countryOfRegistration: z.string().trim().min(1).nullable().optional(),
    notes: z.string().trim().min(1).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided.',
  });

export type UpdateCarInput = z.infer<typeof updateCarSchema>;
