import {
  createRepairItemSchema,
  mongoObjectIdSchema,
  updateRepairItemSchema,
  type RepairItemResponse,
  type RepairItemsListResponse,
} from '@autoservice/contracts';
import type { Request, Response } from 'express';
import { toRepairItemDto } from './repair-item.mapper.js';
import {
  createRepairItem,
  deleteRepairItem,
  getRepairItems,
  updateRepairItem,
} from './repair-item.service.js';

export const getRepairItemsController = async (
  req: Request,
  res: Response<RepairItemsListResponse>,
) => {
  const repairId = mongoObjectIdSchema.parse(req.params.id);

  const items = await getRepairItems(repairId, req.user!);

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Repair items successfully retrieved.',
    data: {
      items: items.map(toRepairItemDto),
    },
  });
};

export const createRepairItemController = async (
  req: Request,
  res: Response<RepairItemResponse>,
) => {
  const repairId = mongoObjectIdSchema.parse(req.params.id);

  const input = createRepairItemSchema.parse(req.body);

  const item = await createRepairItem(repairId, input, req.user!);

  return res.status(201).json({
    status: 201,
    success: true,
    message: 'Repair item successfully created.',
    data: toRepairItemDto(item),
  });
};

export const updateRepairItemController = async (
  req: Request,
  res: Response<RepairItemResponse>,
) => {
  const itemId = mongoObjectIdSchema.parse(req.params.itemId);

  const input = updateRepairItemSchema.parse(req.body);

  const item = await updateRepairItem(itemId, input, req.user!);

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Repair item successfully updated.',
    data: toRepairItemDto(item),
  });
};

export const deleteRepairItemController = async (
  req: Request,
  res: Response,
) => {
  const itemId = mongoObjectIdSchema.parse(req.params.itemId);

  await deleteRepairItem(itemId, req.user!);

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Repair item successfully deleted.',
    data: null,
  });
};
