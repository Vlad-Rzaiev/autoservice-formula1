import z from 'zod';
import { appointmentDtoSchema } from './appointment.schemas.js';

export const appointmentListResponseDataSchema = z.object({
  items: z.array(appointmentDtoSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    totalItems: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
});

export type AppointmentListResponseData = z.infer<
  typeof appointmentListResponseDataSchema
>;
