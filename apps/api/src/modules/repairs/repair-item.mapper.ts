import type { RepairItemDto } from '@autoservice/contracts';
import type { RepairItemLeanDocument } from './repair-item.model.js';

export function toRepairItemDto(
  repairItemLeanDocument: RepairItemLeanDocument,
): RepairItemDto {
  return {
    _id: repairItemLeanDocument._id.toString(),
    repairId: repairItemLeanDocument.repairId.toString(),
    type: repairItemLeanDocument.type,
    name: repairItemLeanDocument.name,
    description: repairItemLeanDocument.description,
    quantity: repairItemLeanDocument.quantity,
    unitPrice: repairItemLeanDocument.unitPrice,
    totalPrice: repairItemLeanDocument.totalPrice,
    source: repairItemLeanDocument.source,
    createdAt: repairItemLeanDocument.createdAt.toISOString(),
    updatedAt: repairItemLeanDocument.updatedAt.toISOString(),
  };
}
