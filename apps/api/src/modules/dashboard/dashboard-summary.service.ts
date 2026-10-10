import createHttpError from 'http-errors';
import type { UserRole } from '@autoservice/contracts';
import { AppointmentCollection } from '../appointments/appointment.model.js';
import { CarCollection } from '../cars/car.model.js';
import { RepairCollection } from '../repairs/repair.model.js';
import { UserCollection } from '../user/user.model.js';

const activeRepairStatuses = [
  'pending',
  'accepted',
  'in_progress',
  'waiting_parts',
  'awaiting_approval',
] as const;

export interface DashboardSummary {
  carsCount: number;
  appointmentsCount: number;
  activeRepairsCount: number;
  completedRepairsCount: number;
}

interface CurrentUser {
  userId: string;
  role: UserRole;
}

export const getDashboardSummary = async (
  currentUser: CurrentUser,
): Promise<DashboardSummary> => {
  const { role } = currentUser;

  if (role === 'owner' || role === 'manager') {
    const [
      carsCount,
      appointmentsCount,
      activeRepairsCount,
      completedRepairsCount,
    ] = await Promise.all([
      CarCollection.countDocuments({ isActive: true }).exec(),
      AppointmentCollection.countDocuments({}).exec(),
      RepairCollection.countDocuments({
        status: { $in: activeRepairStatuses },
      }).exec(),
      RepairCollection.countDocuments({ status: 'completed' }).exec(),
    ]);

    return {
      carsCount,
      appointmentsCount,
      activeRepairsCount,
      completedRepairsCount,
    };
  }

  const user = await UserCollection.findOne({
    userId: currentUser.userId,
    role,
  })
    .select('_id')
    .lean()
    .exec();

  if (!user) {
    throw createHttpError(404, 'User not found.');
  }

  const isClient = role === 'client';

  const carFilter = isClient
    ? { ownerId: user._id, isActive: true }
    : { isActive: true };

  const appointmentFilter = isClient
    ? { clientId: user._id }
    : { assignedMechanicId: user._id };

  const repairFilter = isClient
    ? { clientId: user._id }
    : { assignedMechanicId: user._id };

  const [
    carsCount,
    appointmentsCount,
    activeRepairsCount,
    completedRepairsCount,
  ] = await Promise.all([
    isClient
      ? CarCollection.countDocuments(carFilter).exec()
      : Promise.all([
          RepairCollection.distinct('carId', repairFilter).exec(),
          AppointmentCollection.distinct('carId', appointmentFilter).exec(),
        ]).then(async ([repairCarIds, appointmentCarIds]) => {
          const carIds = [
            ...new Set(
              [...repairCarIds, ...appointmentCarIds].map((id) =>
                id.toString(),
              ),
            ),
          ];

          if (carIds.length === 0) {
            return 0;
          }

          return CarCollection.countDocuments({
            _id: { $in: carIds },
            isActive: true,
          }).exec();
        }),
    AppointmentCollection.countDocuments(appointmentFilter).exec(),
    RepairCollection.countDocuments({
      ...repairFilter,
      status: { $in: activeRepairStatuses },
    }).exec(),
    RepairCollection.countDocuments({
      ...repairFilter,
      status: 'completed',
    }).exec(),
  ]);

  return {
    carsCount,
    appointmentsCount,
    activeRepairsCount,
    completedRepairsCount,
  };
};
