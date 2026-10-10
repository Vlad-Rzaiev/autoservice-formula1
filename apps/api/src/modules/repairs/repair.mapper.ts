import type { RepairDto } from '@autoservice/contracts';
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
