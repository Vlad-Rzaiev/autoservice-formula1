import { z } from 'zod';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const repairItemTypeSchema = z.enum(['work', 'part']);

export type RepairItemType = z.infer<typeof repairItemTypeSchema>;

export const repairItemSourceSchema = z.enum(['client', 'service']);

export type RepairItemSource = z.infer<typeof repairItemSourceSchema>;

export const repairItemDtoSchema = z.object({
  _id: mongoObjectIdSchema,
  repairId: mongoObjectIdSchema,
  type: repairItemTypeSchema,
  name: z.string(),
  description: z.string().nullable(),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative().nullable(),
  totalPrice: z.number().nonnegative().nullable(),
  source: repairItemSourceSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type RepairItemDto = z.infer<typeof repairItemDtoSchema>;

export const createRepairItemSchema = z.object({
  type: repairItemTypeSchema,
  name: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).nullable().default(null),
  quantity: z.number().positive(),
});

export type CreateRepairItemInput = z.infer<typeof createRepairItemSchema>;

export const updateRepairItemSchema = z
  .object({
    type: repairItemTypeSchema.optional(),
    name: z.string().trim().min(1).max(150).optional(),
    description: z.string().trim().min(1).nullable().optional(),
    quantity: z.number().positive().optional(),
    unitPrice: z.number().nonnegative().nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided.',
  });

export type UpdateRepairItemInput = z.infer<typeof updateRepairItemSchema>;
