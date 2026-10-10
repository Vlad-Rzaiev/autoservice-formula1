import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import type {
  ApproveRepairInput,
  CreateRepairInput,
  RepairsListQuery,
  UpdateRepairInput,
  UserRole,
} from '@autoservice/contracts';
import { RepairCollection, type RepairLeanDocument } from './repair.model.js';
import { UserCollection } from '../user/user.model.js';
import { CarCollection } from '../cars/car.model.js';
import { ServiceCollection } from '../services/service.model.js';
import { RepairItemCollection } from './repair-item.model.js';
import { escapeRegex } from '../../utils/escape-regex.js';

export const getRepairs = async (
  query: RepairsListQuery,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<{
  repairs: RepairLeanDocument[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}> => {
  const { page, limit, search, clientId, carId, assignedMechanicId, status } =
    query;

  const skip = (page - 1) * limit;

  let resolvedClientId = clientId;

  if (currentUser.role === 'client') {
    const client = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'client',
    })
      .select('_id')
      .lean()
      .exec();

    if (!client) {
      throw createHttpError(404, 'User not found.');
    }

    resolvedClientId = client._id.toString();
  }

  let resolvedAssignedMechanicId = assignedMechanicId;

  if (currentUser.role === 'mechanic') {
    const mechanic = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'mechanic',
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'User not found.');
    }

    resolvedAssignedMechanicId = mechanic._id.toString();
  }

  const escapedSearch = search ? escapeRegex(search) : undefined;

  const searchFilter = escapedSearch
    ? {
        $or: [
          { title: { $regex: escapedSearch, $options: 'i' } },
          { description: { $regex: escapedSearch, $options: 'i' } },
          { diagnosis: { $regex: escapedSearch, $options: 'i' } },
        ],
      }
    : {};

  const filter = {
    ...(resolvedClientId ? { clientId: resolvedClientId } : {}),
    ...(carId ? { carId } : {}),
    ...(resolvedAssignedMechanicId
      ? { assignedMechanicId: resolvedAssignedMechanicId }
      : {}),
    ...(status ? { status } : {}),
    ...searchFilter,
  };

  const [repairs, totalItems] = await Promise.all([
    RepairCollection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(),

    RepairCollection.countDocuments(filter).exec(),
  ]);

  return {
    repairs,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const getRepairById = async (
  repairId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  const repair = await RepairCollection.findById(repairId).lean().exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (currentUser.role === 'owner' || currentUser.role === 'manager') {
    return repair;
  }

  const user = await UserCollection.findOne({
    userId: currentUser.userId,
    role: currentUser.role,
  })
    .select('_id')
    .lean()
    .exec();

  if (!user) {
    throw createHttpError(404, 'User not found.');
  }

  if (
    currentUser.role === 'client' &&
    repair.clientId.toString() !== user._id.toString()
  ) {
    throw createHttpError(403, 'You do not have access to this repair.');
  }

  if (
    currentUser.role === 'mechanic' &&
    repair.assignedMechanicId?.toString() !== user._id.toString()
  ) {
    throw createHttpError(403, 'You do not have access to this repair.');
  }

  return repair;
};

export const createRepair = async (
  input: CreateRepairInput,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'mechanic') {
    throw createHttpError(403, 'Mechanics cannot create repair requests.');
  }

  let clientId = input.clientId;

  if (currentUser.role === 'client') {
    const client = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'client',
    })
      .select('_id')
      .lean()
      .exec();

    if (!client) {
      throw createHttpError(404, 'User not found.');
    }

    clientId = client._id.toString();
  }

  const client = await UserCollection.findOne({
    _id: clientId,
    role: 'client',
  })
    .select('_id')
    .lean()
    .exec();

  if (!client) {
    throw createHttpError(404, 'Client not found.');
  }

  const car = await CarCollection.findOne({
    _id: input.carId,
    ownerId: client._id,
    isActive: true,
  })
    .select('_id')
    .lean()
    .exec();

  if (!car) {
    throw createHttpError(
      404,
      'Car not found or does not belong to the selected client.',
    );
  }

  let assignedMechanicId = null;

  if (currentUser.role !== 'client' && input.assignedMechanicId) {
    const mechanic = await UserCollection.findOne({
      _id: input.assignedMechanicId,
      role: 'mechanic',
      isActive: true,
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'Mechanic not found.');
    }

    assignedMechanicId = mechanic._id;
  }

  if (input.serviceId) {
    const service = await ServiceCollection.exists({
      _id: input.serviceId,
      isActive: true,
    });

    if (!service) {
      throw createHttpError(404, 'Service not found.');
    }
  }

  const repair = await RepairCollection.create({
    clientId: client._id,
    carId: car._id,
    serviceId: input.serviceId,
    assignedMechanicId,
    status: 'pending',
    title: input.title,
    description: input.description,
    diagnosis: null,
    estimatedCost: null,
    finalCost: null,
    mileage: input.mileage,
    photos: input.photos,
    approval: {
      approvedAt: null,
      approvedBy: null,
      approvedVia: null,
    },
    startedAt: null,
    completedAt: null,
    notes: input.notes,
  });

  return repair.toObject() as RepairLeanDocument;
};

export const updateRepair = async (
  repairId: string,
  input: UpdateRepairInput,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'client') {
    throw createHttpError(403, 'Clients cannot update repairs.');
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (
    repair.status === 'awaiting_approval' ||
    repair.status === 'completed' ||
    repair.status === 'cancelled'
  ) {
    throw createHttpError(
      400,
      'Repairs awaiting approval, completed, or cancelled cannot be updated.',
    );
  }

  if (
    currentUser.role === 'mechanic' &&
    (input.serviceId !== undefined || input.assignedMechanicId !== undefined)
  ) {
    throw createHttpError(
      403,
      'Mechanics cannot change the service or assigned mechanic.',
    );
  }

  if (currentUser.role === 'mechanic') {
    const mechanic = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'mechanic',
      isActive: true,
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'User not found.');
    }

    if (repair.assignedMechanicId?.toString() !== mechanic._id.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }
  }

  if (input.serviceId !== undefined && input.serviceId !== null) {
    const service = await ServiceCollection.exists({
      _id: input.serviceId,
      isActive: true,
    });

    if (!service) {
      throw createHttpError(404, 'Service not found.');
    }
  }

  if (input.assignedMechanicId !== undefined) {
    if (input.assignedMechanicId === null) {
      repair.assignedMechanicId = null;
    } else {
      const mechanic = await UserCollection.findOne({
        _id: input.assignedMechanicId,
        role: 'mechanic',
      })
        .select('_id')
        .lean()
        .exec();

      if (!mechanic) {
        throw createHttpError(404, 'Mechanic not found.');
      }

      repair.assignedMechanicId = mechanic._id;
    }
  }

  if (input.serviceId !== undefined) {
    repair.serviceId = input.serviceId
      ? new Types.ObjectId(input.serviceId)
      : null;
  }

  if (input.title !== undefined) {
    repair.title = input.title;
  }

  if (input.description !== undefined) {
    repair.description = input.description;
  }

  if (input.diagnosis !== undefined) {
    repair.diagnosis = input.diagnosis;
  }

  if (input.estimatedCost !== undefined) {
    repair.estimatedCost = input.estimatedCost;
  }

  if (input.mileage !== undefined) {
    repair.mileage = input.mileage;
  }

  if (input.photos !== undefined) {
    repair.photos = input.photos;
  }

  if (input.notes !== undefined) {
    repair.notes = input.notes;
  }

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const acceptRepair = async (
  repairId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  if (currentUser.role !== 'manager' && currentUser.role !== 'owner') {
    throw createHttpError(
      403,
      'Only managers and owners can accept repair requests.',
    );
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'pending') {
    throw createHttpError(400, 'Only pending repairs can be accepted.');
  }

  repair.status = 'accepted';

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const startRepair = async (
  repairId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'client') {
    throw createHttpError(403, 'Clients cannot start repairs.');
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'accepted') {
    throw createHttpError(400, 'Only accepted repairs can be started.');
  }

  if (currentUser.role === 'mechanic') {
    const mechanic = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'mechanic',
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'User not found.');
    }

    if (repair.assignedMechanicId?.toString() !== mechanic._id.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }
  }

  repair.status = 'in_progress';
  repair.startedAt = new Date();

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const waitingPartsRepair = async (
  repairId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'client') {
    throw createHttpError(403, 'Clients cannot change repair status.');
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'in_progress') {
    throw createHttpError(
      400,
      'Only repairs in progress can be marked as waiting for parts.',
    );
  }

  if (currentUser.role === 'mechanic') {
    const mechanic = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'mechanic',
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'User not found.');
    }

    if (repair.assignedMechanicId?.toString() !== mechanic._id.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }
  }

  repair.status = 'waiting_parts';

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const resumeRepair = async (
  repairId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'client') {
    throw createHttpError(403, 'Clients cannot change repair status.');
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'waiting_parts') {
    throw createHttpError(
      400,
      'Only repairs waiting for parts can be resumed.',
    );
  }

  if (currentUser.role === 'mechanic') {
    const mechanic = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'mechanic',
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'User not found.');
    }

    if (repair.assignedMechanicId?.toString() !== mechanic._id.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }
  }

  repair.status = 'in_progress';

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const requestApprovalRepair = async (
  repairId: string,
  currentUser: { userId: string; role: UserRole },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'client') {
    throw createHttpError(403, 'Clients cannot request repair approval.');
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'in_progress') {
    throw createHttpError(
      400,
      'Only repairs in progress can request approval.',
    );
  }

  if (currentUser.role === 'mechanic') {
    const mechanic = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'mechanic',
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'User not found.');
    }

    if (repair.assignedMechanicId?.toString() !== mechanic._id.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }
  }

  const repairItemsCount = await RepairItemCollection.countDocuments({
    repairId: repair._id,
  }).exec();

  if (repairItemsCount === 0) {
    throw createHttpError(
      400,
      'At least one repair item is required before requesting approval.',
    );
  }

  repair.status = 'awaiting_approval';

  repair.approval = {
    approvedAt: null,
    approvedBy: null,
    approvedVia: null,
  };

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const approveRepair = async (
  repairId: string,
  input: ApproveRepairInput,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'mechanic') {
    throw createHttpError(403, 'Mechanics cannot approve additional work.');
  }

  if (currentUser.role === 'client' && input.via !== 'client') {
    throw createHttpError(403, 'Clients can only approve repairs themselves.');
  }

  if (
    (currentUser.role === 'manager' || currentUser.role === 'owner') &&
    input.via !== 'phone'
  ) {
    throw createHttpError(
      400,
      'Managers and owners can only approve repairs by phone.',
    );
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'awaiting_approval') {
    throw createHttpError(
      400,
      'Only repairs awaiting approval can be approved.',
    );
  }

  const user = await UserCollection.findOne({
    userId: currentUser.userId,
    role: currentUser.role,
  })
    .select('_id')
    .lean()
    .exec();

  if (!user) {
    throw createHttpError(404, 'User not found.');
  }

  if (
    currentUser.role === 'client' &&
    repair.clientId.toString() !== user._id.toString()
  ) {
    throw createHttpError(403, 'You do not have access to this repair.');
  }

  repair.status = 'in_progress';

  repair.approval = {
    approvedAt: new Date(),
    approvedBy: user._id,
    approvedVia: input.via,
  };

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const cancelRepair = async (
  repairId: string,
  currentUser: { userId: string; role: UserRole },
): Promise<RepairLeanDocument> => {
  if (currentUser.role !== 'manager' && currentUser.role !== 'owner') {
    throw createHttpError(403, 'Only managers and owners can cancel repairs.');
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'pending' && repair.status !== 'awaiting_approval') {
    throw createHttpError(
      400,
      'Only pending or awaiting approval repairs can be cancelled.',
    );
  }

  repair.status = 'cancelled';

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};

export const completeRepair = async (
  repairId: string,
  currentUser: { userId: string; role: UserRole },
): Promise<RepairLeanDocument> => {
  if (currentUser.role === 'client') {
    throw createHttpError(403, 'Clients cannot complete repairs.');
  }

  const repair = await RepairCollection.findById(repairId).exec();

  if (!repair) {
    throw createHttpError(404, 'Repair not found.');
  }

  if (repair.status !== 'in_progress') {
    throw createHttpError(400, 'Only repairs in progress can be completed.');
  }

  if (currentUser.role === 'mechanic') {
    const mechanic = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'mechanic',
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'User not found.');
    }

    if (repair.assignedMechanicId?.toString() !== mechanic._id.toString()) {
      throw createHttpError(403, 'You do not have access to this repair.');
    }
  }

  repair.status = 'completed';
  repair.completedAt = new Date();

  await repair.save();

  return repair.toObject() as RepairLeanDocument;
};
