import { describe, expect, it } from 'vitest';
import type {
  AppointmentStatus,
  RepairStatus,
  UserRole,
} from '@autoservice/contracts';
import { AppointmentCollection } from '../appointments/appointment.model.js';
import { CarCollection } from '../cars/car.model.js';
import { RepairCollection } from '../repairs/repair.model.js';
import { UserCollection } from '../user/user.model.js';
import { getDashboardSummary } from './dashboard-summary.service.js';

const createUser = async ({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) =>
  UserCollection.create({
    userId,
    firstName: 'Test',
    lastName: role,
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: `${userId}@test.com`,
    emailVerified: true,
    passwordHash: 'test-password-hash',
    role,
    isActive: true,
  });

const createCar = async (ownerId: string, vin: string, isActive = true) =>
  CarCollection.create({
    ownerId,
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    licensePlate: null,
    vin,
    mileage: 100_000,
    photos: [],
    generation: null,
    bodyType: null,
    fuelType: null,
    transmission: null,
    engine: null,
    color: null,
    registrationDate: null,
    countryOfRegistration: null,
    notes: null,
    isActive,
  });

const createAppointment = async ({
  clientId,
  carId,
  assignedMechanicId = null,
  status = 'pending',
}: {
  clientId: string;
  carId: string;
  assignedMechanicId?: string | null;
  status?: AppointmentStatus;
}) =>
  AppointmentCollection.create({
    clientId,
    carId,
    serviceId: null,
    assignedMechanicId,
    scheduledStart: new Date('2030-06-10T10:00:00.000Z'),
    scheduledEnd: new Date('2030-06-10T11:00:00.000Z'),
    status,
    title: 'Test appointment',
    description: null,
    notes: null,
    repairId: null,
  });

const createRepair = async ({
  clientId,
  carId,
  assignedMechanicId = null,
  status = 'pending',
}: {
  clientId: string;
  carId: string;
  assignedMechanicId?: string | null;
  status?: RepairStatus;
}) =>
  RepairCollection.create({
    clientId,
    carId,
    serviceId: null,
    assignedMechanicId,
    status,
    title: 'Test repair',
    description: null,
    diagnosis: null,
    estimatedCost: null,
    finalCost: null,
    mileage: null,
    photos: {
      before: [],
      after: [],
    },
    approval: {
      approvedAt: null,
      approvedBy: null,
      approvedVia: null,
    },
    startedAt: null,
    completedAt: null,
    notes: null,
  });

describe('getDashboardSummary', () => {
  it('returns only the current client data and excludes inactive cars', async () => {
    const client = await createUser({
      userId: 'summary-client-1',
      role: 'client',
    });
    const otherClient = await createUser({
      userId: 'summary-client-2',
      role: 'client',
    });

    const clientCar = await createCar(
      client._id.toString(),
      'VIN-SUMMARY-CLIENT-1',
    );
    await createCar(
      client._id.toString(),
      'VIN-SUMMARY-CLIENT-INACTIVE',
      false,
    );

    const otherCar = await createCar(
      otherClient._id.toString(),
      'VIN-SUMMARY-OTHER-CLIENT',
    );

    await createAppointment({
      clientId: client._id.toString(),
      carId: clientCar._id.toString(),
    });
    await createAppointment({
      clientId: otherClient._id.toString(),
      carId: otherCar._id.toString(),
    });

    await createRepair({
      clientId: client._id.toString(),
      carId: clientCar._id.toString(),
      status: 'pending',
    });
    await createRepair({
      clientId: client._id.toString(),
      carId: clientCar._id.toString(),
      status: 'completed',
    });
    await createRepair({
      clientId: otherClient._id.toString(),
      carId: otherCar._id.toString(),
      status: 'in_progress',
    });

    await expect(
      getDashboardSummary({
        userId: client.userId,
        role: 'client',
      }),
    ).resolves.toEqual({
      carsCount: 1,
      appointmentsCount: 1,
      activeRepairsCount: 1,
      completedRepairsCount: 1,
    });
  });

  it('counts only repairs and appointments assigned to the mechanic', async () => {
    const client = await createUser({
      userId: 'summary-mechanic-client',
      role: 'client',
    });
    const mechanic = await createUser({
      userId: 'summary-mechanic-1',
      role: 'mechanic',
    });
    const otherMechanic = await createUser({
      userId: 'summary-mechanic-2',
      role: 'mechanic',
    });

    const assignedCar = await createCar(
      client._id.toString(),
      'VIN-SUMMARY-MECHANIC-1',
    );
    const otherCar = await createCar(
      client._id.toString(),
      'VIN-SUMMARY-MECHANIC-2',
    );

    await createRepair({
      clientId: client._id.toString(),
      carId: assignedCar._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });
    await createRepair({
      clientId: client._id.toString(),
      carId: assignedCar._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'completed',
    });
    await createRepair({
      clientId: client._id.toString(),
      carId: otherCar._id.toString(),
      assignedMechanicId: otherMechanic._id.toString(),
      status: 'pending',
    });

    await createAppointment({
      clientId: client._id.toString(),
      carId: assignedCar._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
    });
    await createAppointment({
      clientId: client._id.toString(),
      carId: otherCar._id.toString(),
      assignedMechanicId: otherMechanic._id.toString(),
    });

    await expect(
      getDashboardSummary({
        userId: mechanic.userId,
        role: 'mechanic',
      }),
    ).resolves.toEqual({
      carsCount: 1,
      appointmentsCount: 1,
      activeRepairsCount: 1,
      completedRepairsCount: 1,
    });
  });

  it.each(['manager', 'owner'] as const)(
    'returns global service statistics for %s',
    async (role) => {
      const client = await createUser({
        userId: `summary-global-client-${role}`,
        role: 'client',
      });
      const otherClient = await createUser({
        userId: `summary-global-other-client-${role}`,
        role: 'client',
      });

      const car = await createCar(
        client._id.toString(),
        `VIN-SUMMARY-GLOBAL-1-${role}`,
      );
      const otherCar = await createCar(
        otherClient._id.toString(),
        `VIN-SUMMARY-GLOBAL-2-${role}`,
      );
      await createCar(
        otherClient._id.toString(),
        `VIN-SUMMARY-GLOBAL-INACTIVE-${role}`,
        false,
      );

      await createAppointment({
        clientId: client._id.toString(),
        carId: car._id.toString(),
      });
      await createAppointment({
        clientId: otherClient._id.toString(),
        carId: otherCar._id.toString(),
        status: 'cancelled',
      });

      await createRepair({
        clientId: client._id.toString(),
        carId: car._id.toString(),
        status: 'pending',
      });
      await createRepair({
        clientId: client._id.toString(),
        carId: otherCar._id.toString(),
        status: 'accepted',
      });
      await createRepair({
        clientId: client._id.toString(),
        carId: car._id.toString(),
        status: 'completed',
      });
      await createRepair({
        clientId: otherClient._id.toString(),
        carId: otherCar._id.toString(),
        status: 'cancelled',
      });

      await expect(
        getDashboardSummary({
          userId: `summary-dashboard-${role}`,
          role,
        }),
      ).resolves.toEqual({
        carsCount: 2,
        appointmentsCount: 2,
        activeRepairsCount: 2,
        completedRepairsCount: 1,
      });
    },
  );

  it('counts all configured active repair statuses and excludes cancelled repairs', async () => {
    const client = await createUser({
      userId: 'summary-status-client',
      role: 'client',
    });
    const car = await createCar(client._id.toString(), 'VIN-SUMMARY-STATUSES');

    const activeStatuses: RepairStatus[] = [
      'pending',
      'accepted',
      'in_progress',
      'waiting_parts',
      'awaiting_approval',
    ];

    for (const status of activeStatuses) {
      await createRepair({
        clientId: client._id.toString(),
        carId: car._id.toString(),
        status,
      });
    }

    await createRepair({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'completed',
    });
    await createRepair({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'cancelled',
    });

    await expect(
      getDashboardSummary({
        userId: client.userId,
        role: 'client',
      }),
    ).resolves.toEqual({
      carsCount: 1,
      appointmentsCount: 0,
      activeRepairsCount: 5,
      completedRepairsCount: 1,
    });
  });

  it('throws 404 when the client or mechanic does not exist', async () => {
    await expect(
      getDashboardSummary({
        userId: 'summary-missing-client',
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 404,
      message: 'User not found.',
    });

    await expect(
      getDashboardSummary({
        userId: 'summary-missing-mechanic',
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 404,
      message: 'User not found.',
    });
  });
});
