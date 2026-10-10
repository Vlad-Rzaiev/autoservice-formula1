import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import type {
  AppointmentsListQuery,
  AppointmentStatus,
  CreateAppointmentInput,
  UpdateAppointmentInput,
  UserRole,
} from '@autoservice/contracts';
import {
  AppointmentCollection,
  type AppointmentLeanDocument,
} from './appointment.model.js';
import { UserCollection } from '../user/user.model.js';
import { escapeRegex } from '../../utils/escape-regex.js';
import { CarCollection } from '../cars/car.model.js';
import { ServiceCollection } from '../services/service.model.js';

export const getAppointments = async (
  query: AppointmentsListQuery,
  currentUser: { userId: string; role: UserRole },
): Promise<{
  appointments: AppointmentLeanDocument[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}> => {
  const {
    page,
    limit,
    search,
    clientId,
    carId,
    serviceId,
    assignedMechanicId,
    status,
    scheduledFrom,
    scheduledTo,
  } = query;

  const skip = (page - 1) * limit;

  let resolvedClientId = clientId;
  let resolvedAssignedMechanicId = assignedMechanicId;

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
          { notes: { $regex: escapedSearch, $options: 'i' } },
        ],
      }
    : {};

  const scheduleFilter =
    scheduledFrom && scheduledTo
      ? {
          scheduledStart: { $lt: new Date(scheduledTo) },
          scheduledEnd: { $gt: new Date(scheduledFrom) },
        }
      : scheduledFrom
        ? {
            scheduledEnd: { $gt: new Date(scheduledFrom) },
          }
        : scheduledTo
          ? {
              scheduledStart: { $lt: new Date(scheduledTo) },
            }
          : {};

  const filter = {
    ...(resolvedClientId ? { clientId: resolvedClientId } : {}),
    ...(carId ? { carId } : {}),
    ...(serviceId ? { serviceId } : {}),
    ...(resolvedAssignedMechanicId
      ? { assignedMechanicId: resolvedAssignedMechanicId }
      : {}),
    ...(status ? { status } : {}),
    ...scheduleFilter,
    ...searchFilter,
  };

  const [appointments, totalItems] = await Promise.all([
    AppointmentCollection.find(filter)
      .sort({ scheduledStart: 1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(),

    AppointmentCollection.countDocuments(filter).exec(),
  ]);

  return {
    appointments,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

export const getAppointmentById = async (
  appointmentId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  const appointment = await AppointmentCollection.findById(appointmentId)
    .lean()
    .exec();

  if (!appointment) {
    throw createHttpError(404, 'Appointment not found.');
  }

  if (currentUser.role === 'owner' || currentUser.role === 'manager') {
    return appointment;
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
    appointment.clientId.toString() !== user._id.toString()
  ) {
    throw createHttpError(403, 'You do not have access to this appointment.');
  }

  if (
    currentUser.role === 'mechanic' &&
    appointment.assignedMechanicId?.toString() !== user._id.toString()
  ) {
    throw createHttpError(403, 'You do not have access to this appointment.');
  }

  return appointment;
};

export const createAppointment = async (
  input: CreateAppointmentInput,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  if (currentUser.role === 'mechanic') {
    throw createHttpError(403, 'Mechanics cannot create appointments.');
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

  if (!clientId) {
    throw createHttpError(400, 'Client ID is required.');
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

  if (input.serviceId) {
    const service = await ServiceCollection.exists({
      _id: input.serviceId,
      isActive: true,
    });

    if (!service) {
      throw createHttpError(404, 'Service not found.');
    }
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

  const scheduledStart = new Date(input.scheduledStart);
  const scheduledEnd = new Date(input.scheduledEnd);

  const blockingStatuses = ['pending', 'confirmed', 'in_progress'] as const;

  const overlappingAppointmentFilter = {
    status: { $in: blockingStatuses },
    scheduledStart: { $lt: scheduledEnd },
    scheduledEnd: { $gt: scheduledStart },
    $or: [
      { carId: car._id },
      ...(assignedMechanicId ? [{ assignedMechanicId }] : []),
    ],
  };

  const conflictingAppointment = await AppointmentCollection.exists(
    overlappingAppointmentFilter,
  );

  if (conflictingAppointment) {
    throw createHttpError(
      409,
      'The selected car or mechanic already has an appointment during this time.',
    );
  }

  const appointment = await AppointmentCollection.create({
    clientId: client._id,
    carId: car._id,
    serviceId: input.serviceId,
    assignedMechanicId,
    scheduledStart,
    scheduledEnd,
    status: 'pending',
    title: input.title,
    description: input.description,
    notes: input.notes,
    repairId: null,
  });

  return appointment.toObject() as AppointmentLeanDocument;
};

export const updateAppointment = async (
  appointmentId: string,
  input: UpdateAppointmentInput,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  if (currentUser.role === 'mechanic') {
    throw createHttpError(403, 'Mechanics cannot update appointments.');
  }

  const appointment =
    await AppointmentCollection.findById(appointmentId).exec();

  if (!appointment) {
    throw createHttpError(404, 'Appointment not found.');
  }

  const isClient = currentUser.role === 'client';
  const isManager =
    currentUser.role === 'manager' || currentUser.role === 'owner';

  let currentClientId: Types.ObjectId | null = null;

  if (isClient) {
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

    currentClientId = client._id;

    if (appointment.clientId.toString() !== client._id.toString()) {
      throw createHttpError(403, 'You do not have access to this appointment.');
    }

    if (appointment.status !== 'pending') {
      throw createHttpError(
        400,
        'Clients can only update pending appointments.',
      );
    }
  }

  if (
    isManager &&
    ['completed', 'cancelled', 'no_show'].includes(appointment.status)
  ) {
    throw createHttpError(
      400,
      'Completed, cancelled, or no-show appointments cannot be updated.',
    );
  }

  const nextClientId =
    isManager && input.clientId
      ? new Types.ObjectId(input.clientId)
      : appointment.clientId;

  const nextCarId = input.carId
    ? new Types.ObjectId(input.carId)
    : appointment.carId;

  const nextServiceId =
    input.serviceId !== undefined
      ? input.serviceId
        ? new Types.ObjectId(input.serviceId)
        : null
      : appointment.serviceId;

  const nextMechanicId =
    isManager && input.assignedMechanicId !== undefined
      ? input.assignedMechanicId
        ? new Types.ObjectId(input.assignedMechanicId)
        : null
      : appointment.assignedMechanicId;

  const nextScheduledStart = input.scheduledStart
    ? new Date(input.scheduledStart)
    : appointment.scheduledStart;

  const nextScheduledEnd = input.scheduledEnd
    ? new Date(input.scheduledEnd)
    : appointment.scheduledEnd;

  if (nextScheduledEnd <= nextScheduledStart) {
    throw createHttpError(400, 'Scheduled end must be after scheduled start.');
  }

  const client = await UserCollection.findOne({
    _id: nextClientId,
    role: 'client',
  })
    .select('_id')
    .lean()
    .exec();

  if (!client) {
    throw createHttpError(404, 'Client not found.');
  }

  if (
    currentClientId &&
    nextClientId.toString() !== currentClientId.toString()
  ) {
    throw createHttpError(403, 'Clients cannot change the appointment owner.');
  }

  const car = await CarCollection.findOne({
    _id: nextCarId,
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

  if (nextServiceId) {
    const service = await ServiceCollection.exists({
      _id: nextServiceId,
      isActive: true,
    });

    if (!service) {
      throw createHttpError(404, 'Service not found.');
    }
  }

  if (nextMechanicId) {
    const mechanic = await UserCollection.findOne({
      _id: nextMechanicId,
      role: 'mechanic',
      isActive: true,
    })
      .select('_id')
      .lean()
      .exec();

    if (!mechanic) {
      throw createHttpError(404, 'Mechanic not found.');
    }
  }

  const hasScheduleChanges =
    input.carId !== undefined ||
    input.assignedMechanicId !== undefined ||
    input.scheduledStart !== undefined ||
    input.scheduledEnd !== undefined ||
    (isManager && input.clientId !== undefined);

  if (hasScheduleChanges) {
    const blockingStatuses = ['pending', 'confirmed', 'in_progress'] as const;

    const conflictingAppointment = await AppointmentCollection.exists({
      _id: { $ne: appointment._id },
      status: { $in: blockingStatuses },
      scheduledStart: { $lt: nextScheduledEnd },
      scheduledEnd: { $gt: nextScheduledStart },
      $or: [
        { carId: nextCarId },
        ...(nextMechanicId ? [{ assignedMechanicId: nextMechanicId }] : []),
      ],
    });

    if (conflictingAppointment) {
      throw createHttpError(
        409,
        'The selected car or mechanic already has an appointment during this time.',
      );
    }
  }

  appointment.clientId = nextClientId;
  appointment.carId = nextCarId;
  appointment.serviceId = nextServiceId;
  appointment.assignedMechanicId = nextMechanicId;
  appointment.scheduledStart = nextScheduledStart;
  appointment.scheduledEnd = nextScheduledEnd;

  if (input.title !== undefined) {
    appointment.title = input.title;
  }

  if (input.description !== undefined) {
    appointment.description = input.description;
  }

  if (input.notes !== undefined) {
    appointment.notes = input.notes;
  }

  await appointment.save();

  return appointment.toObject() as AppointmentLeanDocument;
};

const changeAppointmentStatus = async (
  appointmentId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
  allowedStatuses: readonly AppointmentStatus[],
  nextStatus: AppointmentStatus,
  allowAssignedMechanic = false,
): Promise<AppointmentLeanDocument> => {
  const appointment =
    await AppointmentCollection.findById(appointmentId).exec();

  if (!appointment) {
    throw createHttpError(404, 'Appointment not found.');
  }

  if (!allowedStatuses.includes(appointment.status)) {
    throw createHttpError(
      409,
      `Cannot change appointment status from "${appointment.status}" to "${nextStatus}".`,
    );
  }

  const isManagerOrOwner =
    currentUser.role === 'owner' || currentUser.role === 'manager';

  if (!isManagerOrOwner) {
    if (!allowAssignedMechanic || currentUser.role !== 'mechanic') {
      throw createHttpError(
        403,
        'You do not have permission to change this appointment status.',
      );
    }

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

    if (
      appointment.assignedMechanicId?.toString() !== mechanic._id.toString()
    ) {
      throw createHttpError(
        403,
        'You can only manage appointments assigned to you.',
      );
    }
  }

  const updatedAppointment = await AppointmentCollection.findOneAndUpdate(
    {
      _id: appointment._id,
      status: appointment.status,
    },
    {
      $set: { status: nextStatus },
    },
    {
      returnDocument: 'after',
      runValidators: true,
    },
  )
    .lean()
    .exec();

  if (!updatedAppointment) {
    throw createHttpError(
      409,
      'Appointment status has changed. Please reload the appointment.',
    );
  }

  return updatedAppointment;
};

export const confirmAppointment = async (
  appointmentId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  return changeAppointmentStatus(
    appointmentId,
    currentUser,
    ['pending'],
    'confirmed',
  );
};

export const startAppointment = async (
  appointmentId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  return changeAppointmentStatus(
    appointmentId,
    currentUser,
    ['confirmed'],
    'in_progress',
    true,
  );
};

export const completeAppointment = async (
  appointmentId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  return changeAppointmentStatus(
    appointmentId,
    currentUser,
    ['in_progress'],
    'completed',
    true,
  );
};

export const cancelAppointment = async (
  appointmentId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  return changeAppointmentStatus(
    appointmentId,
    currentUser,
    ['pending', 'confirmed'],
    'cancelled',
  );
};

export const markAppointmentNoShow = async (
  appointmentId: string,
  currentUser: {
    userId: string;
    role: UserRole;
  },
): Promise<AppointmentLeanDocument> => {
  return changeAppointmentStatus(
    appointmentId,
    currentUser,
    ['confirmed'],
    'no_show',
  );
};
