import type { RepairDto, RepairListItemDto } from '@autoservice/contracts';

import type { UserLeanDocument } from '../user/user.model.js';
import type { CarLeanDocument } from '../cars/car.model.js';
import type { ServiceLeanDocument } from '../services/service.model.js';
import type { RepairLeanDocument } from './repair.model.js';

export function toRepairDto(repairLeanDocument: RepairLeanDocument): RepairDto {
  return {
    _id: repairLeanDocument._id.toString(),
    clientId: repairLeanDocument.clientId.toString(),
    carId: repairLeanDocument.carId.toString(),
    serviceId: repairLeanDocument.serviceId?.toString() ?? null,
    assignedMechanicId:
      repairLeanDocument.assignedMechanicId?.toString() ?? null,
    status: repairLeanDocument.status,
    title: repairLeanDocument.title,
    description: repairLeanDocument.description,
    diagnosis: repairLeanDocument.diagnosis,
    estimatedCost: repairLeanDocument.estimatedCost,
    finalCost: repairLeanDocument.finalCost,
    mileage: repairLeanDocument.mileage,
    photos: repairLeanDocument.photos,
    approval: {
      approvedAt: repairLeanDocument.approval.approvedAt?.toISOString() ?? null,
      approvedBy: repairLeanDocument.approval.approvedBy?.toString() ?? null,
      approvedVia: repairLeanDocument.approval.approvedVia,
    },
    startedAt: repairLeanDocument.startedAt?.toISOString() ?? null,
    completedAt: repairLeanDocument.completedAt?.toISOString() ?? null,
    notes: repairLeanDocument.notes,
    createdAt: repairLeanDocument.createdAt.toISOString(),
    updatedAt: repairLeanDocument.updatedAt.toISOString(),
  };
}

interface RepairListRelations {
  client: UserLeanDocument;
  car: CarLeanDocument;
  service: ServiceLeanDocument | null;
  assignedMechanic: UserLeanDocument | null;
}

export const toRepairListItemDto = (
  repairLeanDocument: RepairLeanDocument,
  relations: RepairListRelations,
): RepairListItemDto => ({
  _id: repairLeanDocument._id.toString(),

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

  status: repairLeanDocument.status,
  title: repairLeanDocument.title,
  createdAt: repairLeanDocument.createdAt.toISOString(),
});
