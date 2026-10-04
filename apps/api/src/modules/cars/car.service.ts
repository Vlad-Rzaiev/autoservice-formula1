import createHttpError from 'http-errors';
import type {
  CarsListQuery,
  CreateCarInput,
  UpdateCarInput,
  UserRole,
} from '@autoservice/contracts';
import { CarCollection, type CarLeanDocument } from './car.model.js';
import { UserCollection } from '../user/user.model.js';

const escapeRegex = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const getCars = async (
  query: CarsListQuery,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<{
  cars: CarLeanDocument[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}> => {
  const { page, limit, search, ownerId } = query;
  const skip = (page - 1) * limit;

  let resolvedOwnerId = ownerId;

  if (currentUser.role === 'client') {
    const owner = await UserCollection.findOne({
      userId: currentUser.userId,
      role: 'client',
    })
      .select('_id')
      .lean()
      .exec();

    if (!owner) {
      throw createHttpError(404, 'User not found.');
    }

    resolvedOwnerId = owner._id.toString();
  }

  const escapedSearch = search ? escapeRegex(search) : undefined;

  const searchFilter = escapedSearch
    ? {
        $or: [
          { brand: { $regex: escapedSearch, $options: 'i' } },
          { model: { $regex: escapedSearch, $options: 'i' } },
          { licensePlate: { $regex: escapedSearch, $options: 'i' } },
          { vin: { $regex: escapedSearch, $options: 'i' } },
          { generation: { $regex: escapedSearch, $options: 'i' } },
        ],
      }
    : {};

  const filter = {
    isActive: true,
    ...(resolvedOwnerId ? { ownerId: resolvedOwnerId } : {}),
    ...searchFilter,
  };

  const [cars, totalItems] = await Promise.all([
    CarCollection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(),
    CarCollection.countDocuments(filter).exec(),
  ]);

  return {
    cars,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const createCar = async (
  input: CreateCarInput,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<CarLeanDocument> => {
  if (currentUser.role === 'mechanic') {
    throw createHttpError(403, 'Mechanic cannot create cars.');
  }

  const ownerId =
    currentUser.role === 'client' ? currentUser.userId : input.ownerId;

  const owner =
    currentUser.role === 'client'
      ? await UserCollection.findOne({ userId: ownerId })
          .select('_id role isActive')
          .lean()
          .exec()
      : await UserCollection.findById(ownerId)
          .select('_id role isActive')
          .lean()
          .exec();

  if (!owner) {
    throw createHttpError(404, 'Car owner not found.');
  }

  if (currentUser.role === 'manager' && owner.role !== 'client') {
    throw createHttpError(403, 'Manager can create cars only for clients.');
  }

  if (!owner.isActive) {
    throw createHttpError(400, 'Car owner is inactive.');
  }

  const car = await CarCollection.create({
    ...input,
    ownerId: owner._id,
    registrationDate: input.registrationDate
      ? new Date(input.registrationDate)
      : null,
  });

  return car.toObject() as CarLeanDocument;
};

export const updateCar = async (
  carId: string,
  input: UpdateCarInput,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<CarLeanDocument> => {
  if (currentUser.role === 'mechanic') {
    throw createHttpError(403, 'Mechanic cannot update cars.');
  }

  const car = await CarCollection.findOne({
    _id: carId,
    isActive: true,
  }).exec();

  if (!car) {
    throw createHttpError(404, 'Car not found.');
  }

  if (currentUser.role === 'client') {
    const owner = await UserCollection.findOne({
      _id: car.ownerId,
      userId: currentUser.userId,
    })
      .select('_id')
      .lean()
      .exec();

    if (!owner) {
      throw createHttpError(403, 'Client can update only own cars.');
    }
  }

  Object.assign(car, {
    ...input,
    ...(input.registrationDate !== undefined
      ? {
          registrationDate: input.registrationDate
            ? new Date(input.registrationDate)
            : null,
        }
      : {}),
  });

  await car.save();

  return car.toObject() as CarLeanDocument;
};

export const deleteCar = async (
  carId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<CarLeanDocument> => {
  if (currentUser.role === 'mechanic') {
    throw createHttpError(403, 'Mechanic cannot delete cars.');
  }

  if (currentUser.role === 'manager') {
    throw createHttpError(403, 'Manager cannot delete cars.');
  }

  const car = await CarCollection.findOne({
    _id: carId,
    isActive: true,
  }).exec();

  if (!car) {
    throw createHttpError(404, 'Car not found.');
  }

  if (currentUser.role === 'client') {
    const owner = await UserCollection.findOne({
      _id: car.ownerId,
      userId: currentUser.userId,
    })
      .select('_id')
      .lean()
      .exec();

    if (!owner) {
      throw createHttpError(403, 'Client can delete only own cars.');
    }
  }

  car.isActive = false;

  await car.save();

  return car.toObject() as CarLeanDocument;
};
