import { z } from 'zod';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const repairStatusSchema = z.enum([
  'pending',
  'accepted',
  'in_progress',
  'waiting_parts',
  'awaiting_approval',
  'completed',
  'cancelled',
]);

export type RepairStatus = z.infer<typeof repairStatusSchema>;

export const repairPhotosSchema = z.object({
  before: z.array(z.string().min(1)).default([]),
  after: z.array(z.string().min(1)).default([]),
});

export interface RepairPhotosDto {
  before: string[];
  after: string[];
}

export const repairApprovalSchema = z.object({
  approvedAt: z.string().datetime().nullable(),
  approvedBy: mongoObjectIdSchema.nullable(),
  approvedVia: z.enum(['client', 'phone']).nullable(),
});

export type RepairApprovalDto = z.infer<typeof repairApprovalSchema>;

export const repairDtoSchema = z.object({
  _id: mongoObjectIdSchema,
  clientId: mongoObjectIdSchema,
  carId: mongoObjectIdSchema,
  serviceId: mongoObjectIdSchema.nullable(),
  assignedMechanicId: mongoObjectIdSchema.nullable(),
  status: repairStatusSchema,
  title: z.string(),
  description: z.string().nullable(),
  diagnosis: z.string().nullable(),
  estimatedCost: z.number().nonnegative().nullable(),
  finalCost: z.number().nonnegative().nullable(),
  mileage: z.number().int().nonnegative().nullable(),
  photos: repairPhotosSchema,
  approval: repairApprovalSchema,
  startedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type RepairDto = z.infer<typeof repairDtoSchema>;

export const createRepairSchema = z.object({
  clientId: mongoObjectIdSchema,
  carId: mongoObjectIdSchema,
  serviceId: mongoObjectIdSchema.nullable().default(null),
  assignedMechanicId: mongoObjectIdSchema.nullable().default(null),
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).nullable().default(null),
  mileage: z.number().int().nonnegative().nullable().default(null),
  photos: repairPhotosSchema.default({
    before: [],
    after: [],
  }),
  notes: z.string().trim().min(1).nullable().default(null),
});

export type CreateRepairInput = z.infer<typeof createRepairSchema>;

export const updateRepairSchema = z
  .object({
    serviceId: mongoObjectIdSchema.nullable().optional(),
    assignedMechanicId: mongoObjectIdSchema.nullable().optional(),
    title: z.string().trim().min(1).max(150).optional(),
    description: z.string().trim().min(1).nullable().optional(),
    diagnosis: z.string().trim().min(1).nullable().optional(),
    estimatedCost: z.number().nonnegative().nullable().optional(),
    mileage: z.number().int().nonnegative().nullable().optional(),
    photos: repairPhotosSchema.optional(),
    notes: z.string().trim().min(1).nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided.',
  });

export type UpdateRepairInput = z.infer<typeof updateRepairSchema>;

export const approveRepairSchema = z.object({
  via: z.enum(['client', 'phone']),
});

export type ApproveRepairInput = z.infer<typeof approveRepairSchema>;

export const repairsListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().trim().max(100).optional(),
  clientId: mongoObjectIdSchema.optional(),
  carId: mongoObjectIdSchema.optional(),
  assignedMechanicId: mongoObjectIdSchema.optional(),
  status: repairStatusSchema.optional(),
});

export type RepairsListQuery = z.infer<typeof repairsListQuerySchema>;
