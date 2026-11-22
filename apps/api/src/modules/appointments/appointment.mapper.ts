import type {
  AppointmentDto,
  AppointmentListItemDto,
} from '@autoservice/contracts';

import type { UserLeanDocument } from '../user/user.model.js';
import type { CarLeanDocument } from '../cars/car.model.js';
import type { ServiceLeanDocument } from '../services/service.model.js';
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

interface AppointmentListRelations {
  client: UserLeanDocument;
  car: CarLeanDocument;
  service: ServiceLeanDocument | null;
  assignedMechanic: UserLeanDocument | null;
}

export const toAppointmentListItemDto = (
  appointmentLeanDocument: AppointmentLeanDocument,
  relations: AppointmentListRelations,
): AppointmentListItemDto => ({
  _id: appointmentLeanDocument._id.toString(),

  client: {
    _id: relations.client._id.toString(),
    firstName: relations.client.firstName,
    lastName: relations.client.lastName,
    phone: relations.client.phone,
  },

  car: {
    _id: relations.car._id.toString(),
    brand: relations.car.brand,
    model: relations.car.model,
    year: relations.car.year,
    licensePlate: relations.car.licensePlate,
  },

  service: relations.service
    ? {
        _id: relations.service._id.toString(),
        slug: relations.service.slug,
        translations: {
          uk: {
            title: relations.service.translations.uk.title,
          },
          en: {
            title: relations.service.translations.en.title,
          },
          pl: {
            title: relations.service.translations.pl.title,
          },
        },
      }
    : null,

  assignedMechanic: relations.assignedMechanic
    ? {
        _id: relations.assignedMechanic._id.toString(),
        firstName: relations.assignedMechanic.firstName,
        lastName: relations.assignedMechanic.lastName,
      }
    : null,

  scheduledStart: appointmentLeanDocument.scheduledStart.toISOString(),
  scheduledEnd: appointmentLeanDocument.scheduledEnd.toISOString(),
  status: appointmentLeanDocument.status,
  title: appointmentLeanDocument.title,
});
