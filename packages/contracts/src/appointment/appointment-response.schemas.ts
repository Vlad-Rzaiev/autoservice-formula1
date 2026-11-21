import z from 'zod';
import {
  appointmentDtoSchema,
  appointmentListItemDtoSchema,
} from './appointment.schemas.js';
import { createApiResponseSchema } from '../common/api-response.schema.js';

export const appointmentListResponseDataSchema = z.object({
  items: z.array(appointmentListItemDtoSchema),
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

export const appointmentsListResponseSchema = createApiResponseSchema(
  appointmentListResponseDataSchema,
);

export const appointmentResponseSchema =
  createApiResponseSchema(appointmentDtoSchema);
