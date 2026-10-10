import type { AppointmentDto } from '@autoservice/contracts';
import type { AppointmentLeanDocument } from './appointment.model.js';

export const toAppointmentDto = (
  appointmentLeanDocument: AppointmentLeanDocument,
): AppointmentDto => ({
  _id: appointmentLeanDocument._id.toString(),
  clientId: appointmentLeanDocument.clientId.toString(),
  carId: appointmentLeanDocument.carId.toString(),
  serviceId: appointmentLeanDocument.serviceId?.toString() ?? null,
  assignedMechanicId:
    appointmentLeanDocument.assignedMechanicId?.toString() ?? null,
  scheduledStart: appointmentLeanDocument.scheduledStart.toISOString(),
  scheduledEnd: appointmentLeanDocument.scheduledEnd.toISOString(),
  status: appointmentLeanDocument.status,
  title: appointmentLeanDocument.title,
  description: appointmentLeanDocument.description,
  notes: appointmentLeanDocument.notes,
  repairId: appointmentLeanDocument.repairId?.toString() ?? null,
  createdAt: appointmentLeanDocument.createdAt.toISOString(),
  updatedAt: appointmentLeanDocument.updatedAt.toISOString(),
});
