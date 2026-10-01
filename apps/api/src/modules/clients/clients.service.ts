import type { ClientListQuery } from '@autoservice/contracts';
import { UserCollection, type UserLeanDocument } from '../user/user.model.js';

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
