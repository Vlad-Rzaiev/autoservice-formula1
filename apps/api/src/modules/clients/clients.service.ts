import createHttpError from 'http-errors';
import {
  mongoObjectIdSchema,
  type ClientListQuery,
  type UserRole,
} from '@autoservice/contracts';
import { UserCollection, type UserLeanDocument } from '../user/user.model.js';
import { escapeRegex } from '../../utils/escape-regex.js';
import { RepairCollection } from '../repairs/repair.model.js';

const ACTIVE_REPAIR_STATUSES = [
  'accepted',
  'in_progress',
  'waiting_parts',
  'awaiting_approval',
] as const;

export const getClientById = async (
  clientId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<UserLeanDocument> => {
  const validatedClientId = mongoObjectIdSchema.parse(clientId);

  if (
    currentUser.role === 'client' &&
    currentUser.userId !== validatedClientId
  ) {
    throw createHttpError(404, 'Client not found.');
  }

  if (currentUser.role === 'mechanic') {
    const hasAssignedRepair = await RepairCollection.exists({
      clientId: validatedClientId,
      assignedMechanicId: currentUser.userId,
      status: { $in: ACTIVE_REPAIR_STATUSES },
    }).exec();

    if (!hasAssignedRepair) {
      throw createHttpError(404, 'Client not found.');
    }
  }

  const client = await UserCollection.findOne({
    _id: validatedClientId,
    role: 'client',
    isActive: true,
  })
    .lean()
    .exec();

  if (!client) {
    throw createHttpError(404, 'Client not found.');
  }

  return client;
};

export const getClients = async (
  query: ClientListQuery,
): Promise<{
  clients: UserLeanDocument[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}> => {
  const { page, limit, search } = query;
  const skip = (page - 1) * limit;

  const escapedSearch = search ? escapeRegex(search) : undefined;

  const searchFilter = escapedSearch
    ? {
        $or: [
          { firstName: { $regex: escapedSearch, $options: 'i' } },
          { lastName: { $regex: escapedSearch, $options: 'i' } },
          { email: { $regex: escapedSearch, $options: 'i' } },
          { phone: { $regex: escapedSearch, $options: 'i' } },
        ],
      }
    : {};

  const filter = {
    role: 'client' as const,
    isActive: true,
    ...searchFilter,
  };

  const [clients, totalItems] = await Promise.all([
    UserCollection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(),
    UserCollection.countDocuments(filter).exec(),
  ]);

  return {
    clients,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};
