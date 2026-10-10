import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import type {
  CreateRepairItemInput,
  UpdateRepairItemInput,
  UserRole,
} from '@autoservice/contracts';
import { RepairCollection } from './repair.model.js';
import {
  RepairItemCollection,
  type RepairItemLeanDocument,
} from './repair-item.model.js';
import { UserCollection } from '../user/user.model.js';

const getCurrentUserId = async (currentUser: {
  userId: string;
  role: UserRole;
}): Promise<Types.ObjectId> => {
  const user = await UserCollection.findOne({
    userId: currentUser.userId,
  })
    .select('_id role')
    .lean()
    .exec();

  if (!user) {
    throw createHttpError(404, 'User not found.');
  }

  return user._id;
};

const getRepairForAccess = async (
  repairId: string,
  currentUser: { userId: string; role: UserRole },
) => {
  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (currentUser.role === 'owner' || currentUser.role === 'manager') {
    return repair;
  }

  const userId = await getCurrentUserId(currentUser);

  if (currentUser.role === 'client') {
    if (repair.clientId.toString() !== userId.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }

    return repair;
  }

  if (currentUser.role === 'mechanic') {
    if (repair.assignedMechanicId?.toString() !== userId.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }

    return repair;
  }

  throw createHttpError(403, 'You do not have access to this repair.');
};

const recalculateRepairFinalCost = async (
  repairId: Types.ObjectId,
): Promise<void> => {
  const result = await RepairItemCollection.aggregate<{
    total: number;
  }>([
    {
      $match: {
        repairId,
        source: 'service',
        totalPrice: { $ne: null },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$totalPrice',
        },
      },
    },
  ]).exec();

  const finalCost = result[0]?.total ?? null;

  await RepairCollection.updateOne(
    { _id: repairId },
    { $set: { finalCost } },
  ).exec();
};

export const getRepairItems = async (
  repairId: string,
  currentUser: { userId: string; role: UserRole },
): Promise<RepairItemLeanDocument[]> => {
  await getRepairForAccess(repairId, currentUser);

  return RepairItemCollection.find({
    repairId: new Types.ObjectId(repairId),
  })
    .sort({ createdAt: 1 })
    .lean()
    .exec();
};

export const createRepairItem = async (
  repairId: string,
  input: CreateRepairItemInput,
  currentUser: { userId: string; role: UserRole },
): Promise<RepairItemLeanDocument> => {
  const repair = await getRepairForAccess(repairId, currentUser);

  if (currentUser.role === 'client') {
    if (repair.status !== 'pending') {
      throw createHttpError(
        400,
        'Clients can only add repair items to pending repairs.',
      );
    }

    const repairItem = await RepairItemCollection.create({
      repairId: repair._id,
      type: input.type,
      name: input.name,
      description: input.description,
      quantity: input.quantity,
      unitPrice: null,
      totalPrice: null,
      source: 'client',
    });

    return repairItem.toObject() as RepairItemLeanDocument;
  }

  if (repair.status !== 'in_progress') {
    throw createHttpError(
      400,
      'Service repair items can only be added to repairs in progress.',
    );
  }

  const repairItem = await RepairItemCollection.create({
    repairId: repair._id,
    type: input.type,
    name: input.name,
    description: input.description,
    quantity: input.quantity,
    unitPrice: null,
    totalPrice: null,
    source: 'service',
  });

  return repairItem.toObject() as RepairItemLeanDocument;
};

export const updateRepairItem = async (
  repairItemId: string,
  input: UpdateRepairItemInput,
  currentUser: { userId: string; role: UserRole },
): Promise<RepairItemLeanDocument> => {
  const repairItem = await RepairItemCollection.findById(repairItemId).exec();

  if (!repairItem) {
    throw createHttpError(404, 'Repair item not found.');
  }

  const repair = await getRepairForAccess(
    repairItem.repairId.toString(),
    currentUser,
  );

  if (currentUser.role === 'client') {
    if (repair.status !== 'pending') {
      throw createHttpError(
        400,
        'Clients can only update repair items in pending repairs.',
      );
    }

    if (repairItem.source !== 'client') {
      throw createHttpError(
        403,
        'Clients can only update their own repair items.',
      );
    }

    if (input.unitPrice !== undefined) {
      throw createHttpError(
        403,
        'Clients cannot set the price of repair items.',
      );
    }
  } else if (currentUser.role === 'mechanic') {
    if (repair.status !== 'in_progress') {
      throw createHttpError(
        400,
        'Repair items can only be updated for repairs in progress.',
      );
    }
  } else if (repair.status !== 'pending' && repair.status !== 'in_progress') {
    throw createHttpError(
      400,
      'Repair items can only be updated for pending or in-progress repairs.',
    );
  }

  if (input.type !== undefined) {
    repairItem.type = input.type;
  }

  if (input.name !== undefined) {
    repairItem.name = input.name;
  }

  if (input.description !== undefined) {
    repairItem.description = input.description;
  }

  if (input.quantity !== undefined) {
    repairItem.quantity = input.quantity;
  }

  if (input.unitPrice !== undefined) {
    if (currentUser.role === 'client') {
      throw createHttpError(
        403,
        'Clients cannot set the price of repair items.',
      );
    }

    repairItem.unitPrice = input.unitPrice;
  }

  if (repairItem.source === 'client') {
    repairItem.unitPrice = null;
    repairItem.totalPrice = null;
  } else if (repairItem.unitPrice !== null) {
    repairItem.totalPrice = repairItem.quantity * repairItem.unitPrice;
  } else {
    repairItem.totalPrice = null;
  }

  await repairItem.save();

  await recalculateRepairFinalCost(repair._id);

  return repairItem.toObject() as RepairItemLeanDocument;
};

export const deleteRepairItem = async (
  repairItemId: string,
  currentUser: { userId: string; role: UserRole },
): Promise<void> => {
  const repairItem = await RepairItemCollection.findById(repairItemId).exec();

  if (!repairItem) {
    throw createHttpError(404, 'Repair item not found.');
  }

  const repair = await getRepairForAccess(
    repairItem.repairId.toString(),
    currentUser,
  );

  if (currentUser.role === 'client') {
    if (repair.status !== 'pending') {
      throw createHttpError(
        400,
        'Clients can only delete repair items from pending repairs.',
      );
    }

    if (repairItem.source !== 'client') {
      throw createHttpError(
        403,
        'Clients can only delete their own repair items.',
      );
    }
  } else if (currentUser.role === 'mechanic') {
    if (repair.status !== 'in_progress') {
      throw createHttpError(
        400,
        'Repair items can only be deleted from repairs in progress.',
      );
    }
  } else if (repair.status !== 'pending' && repair.status !== 'in_progress') {
    throw createHttpError(
      400,
      'Repair items can only be deleted from pending or in-progress repairs.',
    );
  }

  await RepairItemCollection.deleteOne({
    _id: repairItem._id,
  }).exec();

  await recalculateRepairFinalCost(repair._id);
};
