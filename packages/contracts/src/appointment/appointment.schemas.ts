import z from 'zod';
import { mongoObjectIdSchema } from '../common/mongo.schemas.js';

export const appointmentStatusSchema = z.enum([
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show',
]);

export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;

export const appointmentDtoSchema = z.object({
  _id: mongoObjectIdSchema,
  clientId: mongoObjectIdSchema,
  carId: mongoObjectIdSchema,
  serviceId: mongoObjectIdSchema.nullable(),
  assignedMechanicId: mongoObjectIdSchema.nullable(),
  scheduledStart: z.string().datetime(),
  scheduledEnd: z.string().datetime(),
  status: appointmentStatusSchema,
  title: z.string(),
  description: z.string().nullable(),
  notes: z.string().nullable(),
  repairId: mongoObjectIdSchema.nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type AppointmentDto = z.infer<typeof appointmentDtoSchema>;

export const createAppointmentSchema = z
  .object({
    clientId: mongoObjectIdSchema.optional(),
    carId: mongoObjectIdSchema,
    serviceId: mongoObjectIdSchema.nullable().default(null),
    assignedMechanicId: mongoObjectIdSchema.nullable().default(null),
    scheduledStart: z.string().datetime(),
    scheduledEnd: z.string().datetime(),
    title: z.string().trim().min(1).max(150),
    description: z.string().trim().nullable().default(null),
    notes: z.string().trim().nullable().default(null),
  })
  .refine(
    ({ scheduledStart, scheduledEnd }) =>
      new Date(scheduledEnd) > new Date(scheduledStart),
    {
      message: 'Scheduled end must be after scheduled start.',
      path: ['scheduledEnd'],
    },
  );

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export const updateAppointmentSchema = z
  .object({
    clientId: mongoObjectIdSchema.optional(),
    carId: mongoObjectIdSchema.optional(),
    serviceId: mongoObjectIdSchema.nullable().optional(),
    assignedMechanicId: mongoObjectIdSchema.nullable().optional(),
    scheduledStart: z.string().datetime().optional(),
    scheduledEnd: z.string().datetime().optional(),
    title: z.string().trim().min(1).max(150).optional(),
    description: z.string().trim().nullable().optional(),
    notes: z.string().trim().nullable().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided.',
  });

export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;

export const appointmentsListQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().trim().max(100).optional(),
    clientId: mongoObjectIdSchema.optional(),
    carId: mongoObjectIdSchema.optional(),
    serviceId: mongoObjectIdSchema.optional(),
    assignedMechanicId: mongoObjectIdSchema.optional(),
    status: appointmentStatusSchema.optional(),
    scheduledFrom: z.string().datetime().optional(),
    scheduledTo: z.string().datetime().optional(),
  })
  .refine(
    ({ scheduledFrom, scheduledTo }) =>
      !scheduledFrom ||
      !scheduledTo ||
      new Date(scheduledTo) >= new Date(scheduledFrom),
    {
      message: 'Scheduled end must be after or equal to scheduled start.',
      path: ['scheduledTo'],
    },
  );

export type AppointmentsListQuery = z.infer<typeof appointmentsListQuerySchema>;
