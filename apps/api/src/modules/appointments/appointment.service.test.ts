import { describe, expect, it } from 'vitest';
import type { AppointmentStatus, UserRole } from '@autoservice/contracts';
import { AppointmentCollection } from './appointment.model.js';
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  confirmAppointment,
  startAppointment,
  completeAppointment,
  cancelAppointment,
  markAppointmentNoShow,
} from './appointment.service.js';
import { CarCollection } from '../cars/car.model.js';
import { UserCollection } from '../user/user.model.js';

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

const createCar = async (ownerId: string, vin: string) =>
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
    isActive: true,
  });

const createAppointmentDocument = async ({
  clientId,
  carId,
  assignedMechanicId = null,
  status = 'pending',
  title = 'Oil change',
  scheduledStart = new Date('2030-06-10T10:00:00.000Z'),
  scheduledEnd = new Date('2030-06-10T11:00:00.000Z'),
}: {
  clientId: string;
  carId: string;
  assignedMechanicId?: string | null;
  status?: AppointmentStatus;
  title?: string;
  scheduledStart?: Date;
  scheduledEnd?: Date;
}) =>
  AppointmentCollection.create({
    clientId,
    carId,
    serviceId: null,
    assignedMechanicId,
    scheduledStart,
    scheduledEnd,
    status,
    title,
    description: null,
    notes: null,
    repairId: null,
  });

const manager = {
  userId: 'manager-test',
  role: 'manager' as const,
};

describe('getAppointments', () => {
  it('returns only appointments belonging to the current client', async () => {
    const client = await createUser({
      userId: 'appointments-client-1',
      role: 'client',
    });
    const otherClient = await createUser({
      userId: 'appointments-client-2',
      role: 'client',
    });

    const clientCar = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-CLIENT-1',
    );
    const otherCar = await createCar(
      otherClient._id.toString(),
      'VIN-APPOINTMENT-CLIENT-2',
    );

    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: clientCar._id.toString(),
      title: 'My appointment',
    });
    await createAppointmentDocument({
      clientId: otherClient._id.toString(),
      carId: otherCar._id.toString(),
      title: 'Other appointment',
      scheduledStart: new Date('2030-06-11T10:00:00.000Z'),
      scheduledEnd: new Date('2030-06-11T11:00:00.000Z'),
    });

    const result = await getAppointments(
      { page: 1, limit: 20 },
      { userId: client.userId, role: 'client' },
    );

    expect(result.appointments).toHaveLength(1);
    expect(result.appointments[0]?.title).toBe('My appointment');
    expect(result.pagination.totalItems).toBe(1);
  });

  it('returns only appointments assigned to the current mechanic', async () => {
    const client = await createUser({
      userId: 'appointments-mechanic-client',
      role: 'client',
    });
    const mechanic = await createUser({
      userId: 'appointments-mechanic-1',
      role: 'mechanic',
    });
    const otherMechanic = await createUser({
      userId: 'appointments-mechanic-2',
      role: 'mechanic',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-MECHANIC',
    );

    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      title: 'Assigned appointment',
    });
    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: otherMechanic._id.toString(),
      title: 'Other mechanic appointment',
      scheduledStart: new Date('2030-06-11T10:00:00.000Z'),
      scheduledEnd: new Date('2030-06-11T11:00:00.000Z'),
    });

    const result = await getAppointments(
      { page: 1, limit: 20 },
      { userId: mechanic.userId, role: 'mechanic' },
    );

    expect(result.appointments).toHaveLength(1);
    expect(result.appointments[0]?.title).toBe('Assigned appointment');
  });

  it('returns all appointments for a manager', async () => {
    const client = await createUser({
      userId: 'appointments-manager-client',
      role: 'client',
    });
    const otherClient = await createUser({
      userId: 'appointments-manager-client-2',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-MANAGER-1',
    );
    const otherCar = await createCar(
      otherClient._id.toString(),
      'VIN-APPOINTMENT-MANAGER-2',
    );

    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'First appointment',
    });
    await createAppointmentDocument({
      clientId: otherClient._id.toString(),
      carId: otherCar._id.toString(),
      title: 'Second appointment',
      scheduledStart: new Date('2030-06-11T10:00:00.000Z'),
      scheduledEnd: new Date('2030-06-11T11:00:00.000Z'),
    });

    const result = await getAppointments({ page: 1, limit: 20 }, manager);

    expect(result.appointments).toHaveLength(2);
    expect(result.pagination.totalItems).toBe(2);
  });

  it('filters appointments by status', async () => {
    const client = await createUser({
      userId: 'appointments-status-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-STATUS',
    );

    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
      title: 'Pending appointment',
    });
    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'confirmed',
      title: 'Confirmed appointment',
      scheduledStart: new Date('2030-06-11T10:00:00.000Z'),
      scheduledEnd: new Date('2030-06-11T11:00:00.000Z'),
    });

    const result = await getAppointments(
      { page: 1, limit: 20, status: 'confirmed' },
      { userId: client.userId, role: 'client' },
    );

    expect(result.appointments).toHaveLength(1);
    expect(result.appointments[0]?.title).toBe('Confirmed appointment');
  });

  it('searches appointments by title', async () => {
    const client = await createUser({
      userId: 'appointments-search-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-SEARCH',
    );

    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Brake inspection',
    });
    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Oil service',
      scheduledStart: new Date('2030-06-11T10:00:00.000Z'),
      scheduledEnd: new Date('2030-06-11T11:00:00.000Z'),
    });

    const result = await getAppointments(
      { page: 1, limit: 20, search: 'brake' },
      { userId: client.userId, role: 'client' },
    );

    expect(result.appointments).toHaveLength(1);
    expect(result.appointments[0]?.title).toBe('Brake inspection');
  });

  it('returns correct pagination metadata', async () => {
    const client = await createUser({
      userId: 'appointments-pagination-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-PAGINATION',
    );

    for (let index = 0; index < 3; index += 1) {
      await createAppointmentDocument({
        clientId: client._id.toString(),
        carId: car._id.toString(),
        title: `Appointment ${index}`,
        scheduledStart: new Date(`2030-06-${10 + index}T10:00:00.000Z`),
        scheduledEnd: new Date(`2030-06-${10 + index}T11:00:00.000Z`),
      });
    }

    const result = await getAppointments(
      { page: 2, limit: 2 },
      { userId: client.userId, role: 'client' },
    );

    expect(result.appointments).toHaveLength(1);
    expect(result.pagination).toMatchObject({
      page: 2,
      limit: 2,
      totalItems: 3,
      totalPages: 2,
    });
  });
});

describe('getAppointmentById', () => {
  it('returns the client own appointment', async () => {
    const client = await createUser({
      userId: 'appointments-by-id-client',
      role: 'client',
    });
    const car = await createCar(client._id.toString(), 'VIN-APPOINTMENT-BY-ID');
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
    });

    const result = await getAppointmentById(appointment._id.toString(), {
      userId: client.userId,
      role: 'client',
    });

    expect(result._id.toString()).toBe(appointment._id.toString());
    expect(result.title).toBe('Oil change');
  });

  it('rejects a client accessing another client appointment', async () => {
    const client = await createUser({
      userId: 'appointments-access-client-1',
      role: 'client',
    });
    const otherClient = await createUser({
      userId: 'appointments-access-client-2',
      role: 'client',
    });
    const car = await createCar(
      otherClient._id.toString(),
      'VIN-APPOINTMENT-ACCESS',
    );
    const appointment = await createAppointmentDocument({
      clientId: otherClient._id.toString(),
      carId: car._id.toString(),
    });

    await expect(
      getAppointmentById(appointment._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: 'You do not have access to this appointment.',
    });
  });

  it('returns 404 when the appointment does not exist', async () => {
    await expect(
      getAppointmentById('507f1f77bcf86cd799439011', manager),
    ).rejects.toMatchObject({
      status: 404,
      message: 'Appointment not found.',
    });
  });
});

describe('createAppointment', () => {
  it('allows a client to create an appointment for their own car', async () => {
    const client = await createUser({
      userId: 'appointments-create-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-CREATE',
    );

    const result = await createAppointment(
      {
        clientId: client._id.toString(),
        carId: car._id.toString(),
        serviceId: null,
        assignedMechanicId: null,
        scheduledStart: '2030-07-10T10:00:00.000Z',
        scheduledEnd: '2030-07-10T11:00:00.000Z',
        title: 'Oil change',
        description: 'Regular maintenance',
        notes: null,
      },
      { userId: client.userId, role: 'client' },
    );

    expect(result.clientId.toString()).toBe(client._id.toString());
    expect(result.carId.toString()).toBe(car._id.toString());
    expect(result.status).toBe('pending');
    expect(result.title).toBe('Oil change');
  });

  it('uses the authenticated client instead of the input clientId', async () => {
    const client = await createUser({
      userId: 'appointments-create-owner',
      role: 'client',
    });
    const otherClient = await createUser({
      userId: 'appointments-create-other',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-CREATE-OWNER',
    );

    const result = await createAppointment(
      {
        clientId: otherClient._id.toString(),
        carId: car._id.toString(),
        serviceId: null,
        assignedMechanicId: null,
        scheduledStart: '2030-07-10T10:00:00.000Z',
        scheduledEnd: '2030-07-10T11:00:00.000Z',
        title: 'My appointment',
        description: null,
        notes: null,
      },
      { userId: client.userId, role: 'client' },
    );

    expect(result.clientId.toString()).toBe(client._id.toString());
    expect(result.clientId.toString()).not.toBe(otherClient._id.toString());
  });

  it('does not allow a mechanic to create an appointment', async () => {
    const mechanic = await createUser({
      userId: 'appointments-create-mechanic',
      role: 'mechanic',
    });

    await expect(
      createAppointment(
        {
          clientId: '507f1f77bcf86cd799439011',
          carId: '507f1f77bcf86cd799439012',
          serviceId: null,
          assignedMechanicId: null,
          scheduledStart: '2030-07-10T10:00:00.000Z',
          scheduledEnd: '2030-07-10T11:00:00.000Z',
          title: 'Invalid appointment',
          description: null,
          notes: null,
        },
        { userId: mechanic.userId, role: 'mechanic' },
      ),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects overlapping appointments for the same car', async () => {
    const client = await createUser({
      userId: 'appointments-overlap-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-OVERLAP',
    );

    await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      scheduledStart: new Date('2030-07-10T10:00:00.000Z'),
      scheduledEnd: new Date('2030-07-10T11:00:00.000Z'),
    });

    await expect(
      createAppointment(
        {
          clientId: client._id.toString(),
          carId: car._id.toString(),
          serviceId: null,
          assignedMechanicId: null,
          scheduledStart: '2030-07-10T10:30:00.000Z',
          scheduledEnd: '2030-07-10T11:30:00.000Z',
          title: 'Overlapping appointment',
          description: null,
          notes: null,
        },
        manager,
      ),
    ).rejects.toMatchObject({
      status: 409,
      message:
        'The selected car or mechanic already has an appointment during this time.',
    });
  });
});

describe('updateAppointment', () => {
  it('allows a manager to update an appointment', async () => {
    const client = await createUser({
      userId: 'appointments-update-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-UPDATE',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
    });

    const result = await updateAppointment(
      appointment._id.toString(),
      {
        title: 'Updated maintenance',
        description: 'Updated description',
      },
      manager,
    );

    expect(result.title).toBe('Updated maintenance');
    expect(result.description).toBe('Updated description');
  });

  it('does not allow a client to update another client appointment', async () => {
    const client = await createUser({
      userId: 'appointments-update-client-1',
      role: 'client',
    });
    const otherClient = await createUser({
      userId: 'appointments-update-client-2',
      role: 'client',
    });
    const car = await createCar(
      otherClient._id.toString(),
      'VIN-APPOINTMENT-UPDATE-OTHER',
    );
    const appointment = await createAppointmentDocument({
      clientId: otherClient._id.toString(),
      carId: car._id.toString(),
    });

    await expect(
      updateAppointment(
        appointment._id.toString(),
        { title: 'Unauthorized update' },
        { userId: client.userId, role: 'client' },
      ),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects an end time that is not after the start time', async () => {
    const client = await createUser({
      userId: 'appointments-update-time-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-UPDATE-TIME',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
    });

    await expect(
      updateAppointment(
        appointment._id.toString(),
        {
          scheduledStart: '2030-06-10T12:00:00.000Z',
          scheduledEnd: '2030-06-10T11:00:00.000Z',
        },
        manager,
      ),
    ).rejects.toMatchObject({
      status: 400,
      message: 'Scheduled end must be after scheduled start.',
    });
  });
});

describe('appointment status transitions', () => {
  it('confirms a pending appointment by manager', async () => {
    const client = await createUser({
      userId: 'appointments-confirm-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-CONFIRM',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    const result = await confirmAppointment(
      appointment._id.toString(),
      manager,
    );

    expect(result.status).toBe('confirmed');
  });

  it('starts a confirmed appointment by its assigned mechanic', async () => {
    const client = await createUser({
      userId: 'appointments-start-client',
      role: 'client',
    });
    const mechanic = await createUser({
      userId: 'appointments-start-mechanic',
      role: 'mechanic',
    });
    const car = await createCar(client._id.toString(), 'VIN-APPOINTMENT-START');
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'confirmed',
    });

    const result = await startAppointment(appointment._id.toString(), {
      userId: mechanic.userId,
      role: 'mechanic',
    });

    expect(result.status).toBe('in_progress');
  });

  it('completes an in-progress appointment by its assigned mechanic', async () => {
    const client = await createUser({
      userId: 'appointments-complete-client',
      role: 'client',
    });
    const mechanic = await createUser({
      userId: 'appointments-complete-mechanic',
      role: 'mechanic',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-COMPLETE',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    const result = await completeAppointment(appointment._id.toString(), {
      userId: mechanic.userId,
      role: 'mechanic',
    });

    expect(result.status).toBe('completed');
  });

  it('cancels a pending appointment by manager', async () => {
    const client = await createUser({
      userId: 'appointments-cancel-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-CANCEL',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    const result = await cancelAppointment(appointment._id.toString(), manager);

    expect(result.status).toBe('cancelled');
  });

  it('marks a confirmed appointment as no-show', async () => {
    const client = await createUser({
      userId: 'appointments-no-show-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-NO-SHOW',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'confirmed',
    });

    const result = await markAppointmentNoShow(
      appointment._id.toString(),
      manager,
    );

    expect(result.status).toBe('no_show');
  });

  it('rejects an invalid status transition', async () => {
    const client = await createUser({
      userId: 'appointments-invalid-transition-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-INVALID-TRANSITION',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await expect(
      startAppointment(appointment._id.toString(), manager),
    ).rejects.toMatchObject({
      status: 409,
      message:
        'Cannot change appointment status from "pending" to "in_progress".',
    });
  });

  it('does not allow a client to confirm an appointment', async () => {
    const client = await createUser({
      userId: 'appointments-confirm-forbidden-client',
      role: 'client',
    });
    const car = await createCar(
      client._id.toString(),
      'VIN-APPOINTMENT-CONFIRM-FORBIDDEN',
    );
    const appointment = await createAppointmentDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await expect(
      confirmAppointment(appointment._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('returns 404 when cancelling a missing appointment', async () => {
    await expect(
      cancelAppointment('507f1f77bcf86cd799439011', manager),
    ).rejects.toMatchObject({
      status: 404,
      message: 'Appointment not found.',
    });
  });
});
