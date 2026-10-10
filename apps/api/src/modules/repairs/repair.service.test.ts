import { describe, expect, it } from 'vitest';
import type { RepairStatus, UserRole } from '@autoservice/contracts';
import { CarCollection } from '../cars/car.model.js';
import { UserCollection } from '../user/user.model.js';
import { RepairCollection } from './repair.model.js';
import {
  getRepairById,
  getRepairs,
  createRepair as createRepairService,
  updateRepair as updateRepairService,
  acceptRepair as acceptRepairService,
  startRepair as startRepairService,
  waitingPartsRepair as waitingPartsRepairService,
  resumeRepair as resumeRepairService,
  requestApprovalRepair as requestApprovalRepairService,
  approveRepair as approveRepairService,
  cancelRepair as cancelRepairService,
  completeRepair as completeRepairService,
} from './repair.service.js';
import { ServiceCollection } from '../services/service.model.js';
import { RepairItemCollection } from './repair-item.model.js';

const createUser = async ({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) => {
  return UserCollection.create({
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
};

const createCar = async (ownerId: string, vin: string) => {
  return CarCollection.create({
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
};

const createRepairDocument = async ({
  clientId,
  carId,
  assignedMechanicId = null,
  status = 'pending',
  title = 'Oil change',
  description = null,
  diagnosis = null,
}: {
  clientId: string;
  carId: string;
  assignedMechanicId?: string | null;
  status?: RepairStatus;
  title?: string;
  description?: string | null;
  diagnosis?: string | null;
}) => {
  return RepairCollection.create({
    clientId,
    carId,
    serviceId: null,
    assignedMechanicId,
    status,
    title,
    description,
    diagnosis,
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
};

describe('getRepairs', () => {
  it('returns only the current client repairs', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const otherClient = await createUser({
      userId: 'client-2',
      role: 'client',
    });

    const clientCar = await createCar(client._id.toString(), 'VIN-CLIENT-0001');

    const otherClientCar = await createCar(
      otherClient._id.toString(),
      'VIN-CLIENT-0002',
    );

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: clientCar._id.toString(),
      title: 'Client repair',
    });

    await createRepairDocument({
      clientId: otherClient._id.toString(),
      carId: otherClientCar._id.toString(),
      title: 'Other client repair',
    });

    const result = await getRepairs(
      {
        page: 1,
        limit: 20,
      },
      {
        userId: client.userId,
        role: 'client',
      },
    );

    expect(result.repairs).toHaveLength(1);
    expect(result.repairs[0]?.title).toBe('Client repair');
    expect(result.pagination.totalItems).toBe(1);
  });

  it('returns only repairs assigned to the current mechanic', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-1',
      role: 'mechanic',
    });

    const otherMechanic = await createUser({
      userId: 'mechanic-2',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-MECHANIC-0001');

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      title: 'Assigned repair',
    });

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: otherMechanic._id.toString(),
      title: 'Other mechanic repair',
    });

    const result = await getRepairs(
      {
        page: 1,
        limit: 20,
      },
      {
        userId: mechanic.userId,
        role: 'mechanic',
      },
    );

    expect(result.repairs).toHaveLength(1);
    expect(result.repairs[0]?.title).toBe('Assigned repair');
    expect(result.pagination.totalItems).toBe(1);
  });

  it('returns all repairs for a manager', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const otherClient = await createUser({
      userId: 'client-2',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-MANAGER-0001');

    const otherCar = await createCar(
      otherClient._id.toString(),
      'VIN-MANAGER-0002',
    );

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'First repair',
    });

    await createRepairDocument({
      clientId: otherClient._id.toString(),
      carId: otherCar._id.toString(),
      title: 'Second repair',
    });

    const result = await getRepairs(
      {
        page: 1,
        limit: 20,
      },
      {
        userId: 'manager-1',
        role: 'manager',
      },
    );

    expect(result.repairs).toHaveLength(2);
    expect(result.pagination.totalItems).toBe(2);
  });

  it('returns all repairs for an owner', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const otherClient = await createUser({
      userId: 'client-2',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-OWNER-0001');

    const otherCar = await createCar(
      otherClient._id.toString(),
      'VIN-OWNER-0002',
    );

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'First repair',
    });

    await createRepairDocument({
      clientId: otherClient._id.toString(),
      carId: otherCar._id.toString(),
      title: 'Second repair',
    });

    const result = await getRepairs(
      {
        page: 1,
        limit: 20,
      },
      {
        userId: 'owner-1',
        role: 'owner',
      },
    );

    expect(result.repairs).toHaveLength(2);
    expect(result.pagination.totalItems).toBe(2);
  });

  it('filters repairs by status', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-STATUS-0001');

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
      title: 'Pending repair',
    });

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
      title: 'In progress repair',
    });

    const result = await getRepairs(
      {
        page: 1,
        limit: 20,
        status: 'in_progress',
      },
      {
        userId: client.userId,
        role: 'client',
      },
    );

    expect(result.repairs).toHaveLength(1);
    expect(result.repairs[0]?.title).toBe('In progress repair');
    expect(result.pagination.totalItems).toBe(1);
  });

  it('searches repairs by title, description and diagnosis', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-SEARCH-0001');

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Brake inspection',
    });

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Oil service',
      description: 'Engine oil replacement',
    });

    await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Engine repair',
      diagnosis: 'Turbocharger failure',
    });

    const result = await getRepairs(
      {
        page: 1,
        limit: 20,
        search: 'engine oil',
      },
      {
        userId: client.userId,
        role: 'client',
      },
    );

    expect(result.repairs).toHaveLength(1);
    expect(result.repairs[0]?.title).toBe('Oil service');
  });
});

describe('getRepairById', () => {
  it('returns the client own repair', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-BY-ID-0001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Client repair',
    });

    const result = await getRepairById(repair._id.toString(), {
      userId: client.userId,
      role: 'client',
    });

    expect(result._id.toString()).toBe(repair._id.toString());
    expect(result.title).toBe('Client repair');
  });

  it('throws 403 when a client requests another client repair', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const otherClient = await createUser({
      userId: 'client-2',
      role: 'client',
    });

    const otherCar = await createCar(
      otherClient._id.toString(),
      'VIN-BY-ID-0002',
    );

    const repair = await createRepairDocument({
      clientId: otherClient._id.toString(),
      carId: otherCar._id.toString(),
      title: 'Other client repair',
    });

    await expect(
      getRepairById(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: 'You do not have access to this repair.',
    });
  });

  it('returns a repair assigned to the current mechanic', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-BY-ID-0003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      title: 'Assigned repair',
    });

    const result = await getRepairById(repair._id.toString(), {
      userId: mechanic.userId,
      role: 'mechanic',
    });

    expect(result._id.toString()).toBe(repair._id.toString());
    expect(result.title).toBe('Assigned repair');
  });

  it('throws 403 when a mechanic requests a repair assigned to another mechanic', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-1',
      role: 'mechanic',
    });

    const otherMechanic = await createUser({
      userId: 'mechanic-2',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-BY-ID-0004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: otherMechanic._id.toString(),
      title: 'Other mechanic repair',
    });

    await expect(
      getRepairById(repair._id.toString(), {
        userId: mechanic.userId,
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: 'You do not have access to this repair.',
    });
  });

  it('returns any repair for a manager', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-BY-ID-0005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Manager repair',
    });

    const result = await getRepairById(repair._id.toString(), {
      userId: 'manager-1',
      role: 'manager',
    });

    expect(result._id.toString()).toBe(repair._id.toString());
    expect(result.title).toBe('Manager repair');
  });

  it('throws 404 when the repair does not exist', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-BY-ID-0006');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
    });

    await RepairCollection.deleteOne({
      _id: repair._id,
    });

    await expect(
      getRepairById(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 404,
      message: 'Repair not found.',
    });
  });
});

describe('createRepair', () => {
  it('allows a client to create a repair for their own car', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-CREATE-0001');

    const result = await createRepairService(
      {
        clientId: client._id.toString(),
        carId: car._id.toString(),
        serviceId: null,
        assignedMechanicId: null,
        title: 'Oil change',
        description: 'Regular maintenance',
        mileage: 100_000,
        photos: {
          before: [],
          after: [],
        },
        notes: null,
      },
      {
        userId: client.userId,
        role: 'client',
      },
    );

    expect(result.clientId.toString()).toBe(client._id.toString());
    expect(result.carId.toString()).toBe(car._id.toString());
    expect(result.status).toBe('pending');
    expect(result.title).toBe('Oil change');
    expect(result.assignedMechanicId).toBeNull();
  });

  it('does not allow a client to create a repair for another client car', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const otherClient = await createUser({
      userId: 'client-2',
      role: 'client',
    });

    const otherCar = await createCar(
      otherClient._id.toString(),
      'VIN-CREATE-0002',
    );

    await expect(
      createRepairService(
        {
          clientId: client._id.toString(),
          carId: otherCar._id.toString(),
          serviceId: null,
          assignedMechanicId: null,
          title: 'Unauthorized repair',
          description: null,
          mileage: null,
          photos: {
            before: [],
            after: [],
          },
          notes: null,
        },
        {
          userId: client.userId,
          role: 'client',
        },
      ),
    ).rejects.toMatchObject({
      status: 404,
      message: 'Car not found or does not belong to the selected client.',
    });
  });

  it('uses the authenticated client instead of the input clientId', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const otherClient = await createUser({
      userId: 'client-2',
      role: 'client',
    });

    const clientCar = await createCar(client._id.toString(), 'VIN-CREATE-0003');

    const result = await createRepairService(
      {
        clientId: otherClient._id.toString(),
        carId: clientCar._id.toString(),
        serviceId: null,
        assignedMechanicId: null,
        title: 'Own repair',
        description: null,
        mileage: null,
        photos: {
          before: [],
          after: [],
        },
        notes: null,
      },
      {
        userId: client.userId,
        role: 'client',
      },
    );

    expect(result.clientId.toString()).toBe(client._id.toString());
    expect(result.clientId.toString()).not.toBe(otherClient._id.toString());
  });

  it('does not allow a mechanic to create a repair', async () => {
    const mechanic = await createUser({
      userId: 'mechanic-1',
      role: 'mechanic',
    });

    await expect(
      createRepairService(
        {
          clientId: '000000000000000000000001',
          carId: '000000000000000000000002',
          serviceId: null,
          assignedMechanicId: null,
          title: 'Mechanic repair',
          description: null,
          mileage: null,
          photos: {
            before: [],
            after: [],
          },
          notes: null,
        },
        {
          userId: mechanic.userId,
          role: 'mechanic',
        },
      ),
    ).rejects.toMatchObject({
      status: 403,
      message: 'Mechanics cannot create repair requests.',
    });
  });

  it('allows a manager to create a repair for a client', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-1',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-CREATE-0004');

    const result = await createRepairService(
      {
        clientId: client._id.toString(),
        carId: car._id.toString(),
        serviceId: null,
        assignedMechanicId: null,
        title: 'Manager created repair',
        description: null,
        mileage: 80_000,
        photos: {
          before: [],
          after: [],
        },
        notes: 'Created after phone call.',
      },
      {
        userId: manager.userId,
        role: 'manager',
      },
    );

    expect(result.clientId.toString()).toBe(client._id.toString());
    expect(result.carId.toString()).toBe(car._id.toString());
    expect(result.status).toBe('pending');
    expect(result.assignedMechanicId).toBeNull();
  });

  it('allows a manager to assign a mechanic when creating a repair', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-1',
      role: 'manager',
    });

    const mechanic = await createUser({
      userId: 'mechanic-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-CREATE-0005');

    const result = await createRepairService(
      {
        clientId: client._id.toString(),
        carId: car._id.toString(),
        serviceId: null,
        assignedMechanicId: mechanic._id.toString(),
        title: 'Assigned repair',
        description: null,
        mileage: null,
        photos: {
          before: [],
          after: [],
        },
        notes: null,
      },
      {
        userId: manager.userId,
        role: 'manager',
      },
    );

    expect(result.assignedMechanicId?.toString()).toBe(mechanic._id.toString());
  });

  it('rejects assigning a non-mechanic user', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-1',
      role: 'manager',
    });

    const otherClient = await createUser({
      userId: 'client-2',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-CREATE-0006');

    await expect(
      createRepairService(
        {
          clientId: client._id.toString(),
          carId: car._id.toString(),
          serviceId: null,
          assignedMechanicId: otherClient._id.toString(),
          title: 'Invalid assignment',
          description: null,
          mileage: null,
          photos: {
            before: [],
            after: [],
          },
          notes: null,
        },
        {
          userId: manager.userId,
          role: 'manager',
        },
      ),
    ).rejects.toMatchObject({
      status: 404,
      message: 'Mechanic not found.',
    });
  });

  it('rejects an inactive service', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-1',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-CREATE-0007');

    const service = await ServiceCollection.create({
      slug: 'inactive-oil-change',
      category: 'maintenance',
      specializationIds: [],
      workDirectionIds: [],
      iconKey: 'circle-gauge',
      featured: false,
      sortOrder: 999,
      isActive: false,
      translations: {
        uk: {
          title: 'Заміна масла',
          description: 'Заміна моторного масла',
        },
        en: {
          title: 'Oil change',
          description: 'Engine oil replacement',
        },
        pl: {
          title: 'Wymiana oleju',
          description: 'Wymiana oleju silnikowego',
        },
      },
    });

    await expect(
      createRepairService(
        {
          clientId: client._id.toString(),
          carId: car._id.toString(),
          serviceId: service._id.toString(),
          assignedMechanicId: null,
          title: 'Inactive service',
          description: null,
          mileage: null,
          photos: {
            before: [],
            after: [],
          },
          notes: null,
        },
        {
          userId: manager.userId,
          role: 'manager',
        },
      ),
    ).rejects.toMatchObject({
      status: 404,
      message: 'Service not found.',
    });
  });

  it('ignores assignedMechanicId when a client creates a repair', async () => {
    const client = await createUser({
      userId: 'client-1',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-CREATE-0008');

    const result = await createRepairService(
      {
        clientId: client._id.toString(),
        carId: car._id.toString(),
        serviceId: null,
        assignedMechanicId: mechanic._id.toString(),
        title: 'Client repair',
        description: null,
        mileage: null,
        photos: {
          before: [],
          after: [],
        },
        notes: null,
      },
      {
        userId: client.userId,
        role: 'client',
      },
    );

    expect(result.assignedMechanicId).toBeNull();
  });
});

describe('updateRepair', () => {
  it('allows a manager to update a repair', async () => {
    const client = await createUser({
      userId: 'client-update-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-UPDATE-001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      title: 'Oil change',
      description: 'Initial description',
    });

    const updatedRepair = await updateRepairService(
      repair._id.toString(),
      {
        title: 'Full maintenance',
        description: 'Updated description',
        diagnosis: 'Engine oil needs replacement',
      },
      {
        userId: 'manager-update-1',
        role: 'manager',
      },
    );

    expect(updatedRepair.title).toBe('Full maintenance');
    expect(updatedRepair.description).toBe('Updated description');
    expect(updatedRepair.diagnosis).toBe('Engine oil needs replacement');
  });

  it('allows an owner to update a repair', async () => {
    const client = await createUser({
      userId: 'client-update-2',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-UPDATE-002');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
    });

    const updatedRepair = await updateRepairService(
      repair._id.toString(),
      {
        title: 'Updated by owner',
      },
      {
        userId: 'owner-update-1',
        role: 'owner',
      },
    );

    expect(updatedRepair.title).toBe('Updated by owner');
  });

  it('allows the assigned mechanic to update a repair', async () => {
    const client = await createUser({
      userId: 'client-update-3',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-update-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-UPDATE-003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    const updatedRepair = await updateRepairService(
      repair._id.toString(),
      {
        diagnosis: 'Brake pads are worn',
      },
      {
        userId: mechanic.userId,
        role: 'mechanic',
      },
    );

    expect(updatedRepair.diagnosis).toBe('Brake pads are worn');
  });

  it('does not allow a client to update a repair', async () => {
    const client = await createUser({
      userId: 'client-update-4',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-UPDATE-004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
    });

    await expect(
      updateRepairService(
        repair._id.toString(),
        {
          title: 'Client update',
        },
        {
          userId: client.userId,
          role: 'client',
        },
      ),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('does not allow an unassigned mechanic to update a repair', async () => {
    const client = await createUser({
      userId: 'client-update-5',
      role: 'client',
    });

    const assignedMechanic = await createUser({
      userId: 'mechanic-update-2',
      role: 'mechanic',
    });

    const otherMechanic = await createUser({
      userId: 'mechanic-update-3',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-UPDATE-005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: assignedMechanic._id.toString(),
      status: 'in_progress',
    });

    await expect(
      updateRepairService(
        repair._id.toString(),
        {
          diagnosis: 'Unauthorized update',
        },
        {
          userId: otherMechanic.userId,
          role: 'mechanic',
        },
      ),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it.each(['awaiting_approval', 'completed', 'cancelled'] as const)(
    'does not allow updates when repair status is %s',
    async (status) => {
      const client = await createUser({
        userId: `client-update-${status}`,
        role: 'client',
      });

      const car = await createCar(
        client._id.toString(),
        `VIN-UPDATE-${status}`,
      );

      const repair = await createRepairDocument({
        clientId: client._id.toString(),
        carId: car._id.toString(),
        status,
      });

      await expect(
        updateRepairService(
          repair._id.toString(),
          {
            title: 'Blocked update',
          },
          {
            userId: 'manager-update-status',
            role: 'manager',
          },
        ),
      ).rejects.toMatchObject({
        status: 400,
      });
    },
  );
});

describe('acceptRepair', () => {
  it('allows a manager to accept a pending repair', async () => {
    const client = await createUser({
      userId: 'client-accept-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-ACCEPT-001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    const acceptedRepair = await acceptRepairService(repair._id.toString(), {
      userId: 'manager-accept-1',
      role: 'manager',
    });

    expect(acceptedRepair.status).toBe('accepted');
  });

  it('allows an owner to accept a pending repair', async () => {
    const client = await createUser({
      userId: 'client-accept-2',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-ACCEPT-002');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    const acceptedRepair = await acceptRepairService(repair._id.toString(), {
      userId: 'owner-accept-1',
      role: 'owner',
    });

    expect(acceptedRepair.status).toBe('accepted');
  });

  it('does not allow a client to accept a repair', async () => {
    const client = await createUser({
      userId: 'client-accept-3',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-ACCEPT-003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await expect(
      acceptRepairService(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('does not allow a mechanic to accept a repair', async () => {
    const client = await createUser({
      userId: 'client-accept-4',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-accept-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-ACCEPT-004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'pending',
    });

    await expect(
      acceptRepairService(repair._id.toString(), {
        userId: mechanic.userId,
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('does not allow accepting a repair that is not pending', async () => {
    const client = await createUser({
      userId: 'client-accept-5',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-ACCEPT-005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'accepted',
    });

    await expect(
      acceptRepairService(repair._id.toString(), {
        userId: 'manager-accept-2',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('throws 404 when the repair does not exist', async () => {
    const client = await createUser({
      userId: 'client-accept-6',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-ACCEPT-006');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
    });

    await RepairCollection.deleteOne({
      _id: repair._id,
    }).exec();

    await expect(
      acceptRepairService(repair._id.toString(), {
        userId: 'manager-accept-3',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('startRepair', () => {
  it('allows a manager to start an accepted repair', async () => {
    const client = await createUser({
      userId: 'client-start-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-START-001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'accepted',
    });

    const startedRepair = await startRepairService(repair._id.toString(), {
      userId: 'manager-start-1',
      role: 'manager',
    });

    expect(startedRepair.status).toBe('in_progress');
    expect(startedRepair.startedAt).toBeInstanceOf(Date);
  });

  it('allows an owner to start an accepted repair', async () => {
    const client = await createUser({
      userId: 'client-start-2',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-START-002');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'accepted',
    });

    const startedRepair = await startRepairService(repair._id.toString(), {
      userId: 'owner-start-1',
      role: 'owner',
    });

    expect(startedRepair.status).toBe('in_progress');
    expect(startedRepair.startedAt).toBeInstanceOf(Date);
  });

  it('allows the assigned mechanic to start an accepted repair', async () => {
    const client = await createUser({
      userId: 'client-start-3',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-start-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-START-003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'accepted',
    });

    const startedRepair = await startRepairService(repair._id.toString(), {
      userId: mechanic.userId,
      role: 'mechanic',
    });

    expect(startedRepair.status).toBe('in_progress');
    expect(startedRepair.startedAt).toBeInstanceOf(Date);
  });

  it('does not allow an unassigned mechanic to start a repair', async () => {
    const client = await createUser({
      userId: 'client-start-4',
      role: 'client',
    });

    const assignedMechanic = await createUser({
      userId: 'mechanic-start-2',
      role: 'mechanic',
    });

    const otherMechanic = await createUser({
      userId: 'mechanic-start-3',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-START-004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: assignedMechanic._id.toString(),
      status: 'accepted',
    });

    await expect(
      startRepairService(repair._id.toString(), {
        userId: otherMechanic.userId,
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('does not allow a client to start a repair', async () => {
    const client = await createUser({
      userId: 'client-start-5',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-START-005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'accepted',
    });

    await expect(
      startRepairService(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('does not allow starting a repair that is not accepted', async () => {
    const client = await createUser({
      userId: 'client-start-6',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-START-006');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await expect(
      startRepairService(repair._id.toString(), {
        userId: 'manager-start-2',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('throws 404 when the repair does not exist', async () => {
    const client = await createUser({
      userId: 'client-start-7',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-START-007');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'accepted',
    });

    await RepairCollection.deleteOne({
      _id: repair._id,
    }).exec();

    await expect(
      startRepairService(repair._id.toString(), {
        userId: 'manager-start-3',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('waitingPartsRepair', () => {
  it('allows an assigned mechanic to move an in-progress repair to waiting_parts', async () => {
    const client = await createUser({
      userId: 'client-waiting-parts-1',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-waiting-parts-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-WAITING-PARTS-001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    const updatedRepair = await waitingPartsRepairService(
      repair._id.toString(),
      {
        userId: mechanic.userId,
        role: 'mechanic',
      },
    );

    expect(updatedRepair.status).toBe('waiting_parts');
  });

  it('allows a manager to move an in-progress repair to waiting_parts', async () => {
    const client = await createUser({
      userId: 'client-waiting-parts-2',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-WAITING-PARTS-002');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    const updatedRepair = await waitingPartsRepairService(
      repair._id.toString(),
      {
        userId: 'manager-waiting-parts-1',
        role: 'manager',
      },
    );

    expect(updatedRepair.status).toBe('waiting_parts');
  });

  it('allows an owner to move an in-progress repair to waiting_parts', async () => {
    const client = await createUser({
      userId: 'client-waiting-parts-3',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-WAITING-PARTS-003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    const updatedRepair = await waitingPartsRepairService(
      repair._id.toString(),
      {
        userId: 'owner-waiting-parts-1',
        role: 'owner',
      },
    );

    expect(updatedRepair.status).toBe('waiting_parts');
  });

  it('does not allow an unassigned mechanic to move a repair to waiting_parts', async () => {
    const client = await createUser({
      userId: 'client-waiting-parts-4',
      role: 'client',
    });

    const assignedMechanic = await createUser({
      userId: 'mechanic-waiting-parts-2',
      role: 'mechanic',
    });

    const otherMechanic = await createUser({
      userId: 'mechanic-waiting-parts-3',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-WAITING-PARTS-004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: assignedMechanic._id.toString(),
      status: 'in_progress',
    });

    await expect(
      waitingPartsRepairService(repair._id.toString(), {
        userId: otherMechanic.userId,
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('does not allow a client to move a repair to waiting_parts', async () => {
    const client = await createUser({
      userId: 'client-waiting-parts-5',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-WAITING-PARTS-005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await expect(
      waitingPartsRepairService(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('does not allow moving a repair to waiting_parts when it is not in progress', async () => {
    const client = await createUser({
      userId: 'client-waiting-parts-6',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-WAITING-PARTS-006');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'accepted',
    });

    await expect(
      waitingPartsRepairService(repair._id.toString(), {
        userId: 'manager-waiting-parts-2',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('throws 404 when the repair does not exist', async () => {
    const client = await createUser({
      userId: 'client-waiting-parts-7',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-WAITING-PARTS-007');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await RepairCollection.deleteOne({
      _id: repair._id,
    }).exec();

    await expect(
      waitingPartsRepairService(repair._id.toString(), {
        userId: 'manager-waiting-parts-3',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('resumeRepair', () => {
  it('allows an assigned mechanic to resume a repair', async () => {
    const client = await createUser({
      userId: 'client-resume-1',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-resume-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-RESUME-001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'waiting_parts',
    });

    const result = await resumeRepairService(repair._id.toString(), {
      userId: mechanic.userId,
      role: 'mechanic',
    });

    expect(result.status).toBe('in_progress');
  });

  it('allows a manager to resume a repair', async () => {
    const client = await createUser({
      userId: 'client-resume-2',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-resume-1',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-RESUME-002');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'waiting_parts',
    });

    const result = await resumeRepairService(repair._id.toString(), {
      userId: manager.userId,
      role: 'manager',
    });

    expect(result.status).toBe('in_progress');
  });

  it('allows an owner to resume a repair', async () => {
    const client = await createUser({
      userId: 'client-resume-3',
      role: 'client',
    });

    const owner = await createUser({
      userId: 'owner-resume-1',
      role: 'owner',
    });

    const car = await createCar(client._id.toString(), 'VIN-RESUME-003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'waiting_parts',
    });

    const result = await resumeRepairService(repair._id.toString(), {
      userId: owner.userId,
      role: 'owner',
    });

    expect(result.status).toBe('in_progress');
  });

  it('rejects an unassigned mechanic', async () => {
    const client = await createUser({
      userId: 'client-resume-4',
      role: 'client',
    });

    const assignedMechanic = await createUser({
      userId: 'mechanic-resume-2',
      role: 'mechanic',
    });

    const anotherMechanic = await createUser({
      userId: 'mechanic-resume-3',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-RESUME-004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: assignedMechanic._id.toString(),
      status: 'waiting_parts',
    });

    await expect(
      resumeRepairService(repair._id.toString(), {
        userId: anotherMechanic.userId,
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects a client', async () => {
    const client = await createUser({
      userId: 'client-resume-5',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-resume-4',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-RESUME-005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'waiting_parts',
    });

    await expect(
      resumeRepairService(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects a repair that is not waiting for parts', async () => {
    const client = await createUser({
      userId: 'client-resume-6',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-resume-2',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-RESUME-006');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await expect(
      resumeRepairService(repair._id.toString(), {
        userId: manager.userId,
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('returns 404 when the repair does not exist', async () => {
    const manager = await createUser({
      userId: 'manager-resume-3',
      role: 'manager',
    });

    await expect(
      resumeRepairService('507f1f77bcf86cd799439011', {
        userId: manager.userId,
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('requestApprovalRepair', () => {
  it('allows an assigned mechanic to request approval', async () => {
    const client = await createUser({
      userId: 'client-approval-1',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-approval-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVAL-001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    await RepairItemCollection.create({
      repairId: repair._id,
      type: 'work',
      name: 'Brake pad replacement',
      description: null,
      quantity: 1,
      unitPrice: 150,
      totalPrice: 150,
      source: 'client',
    });

    const result = await requestApprovalRepairService(repair._id.toString(), {
      userId: mechanic.userId,
      role: 'mechanic',
    });

    expect(result.status).toBe('awaiting_approval');
    expect(result.approval.approvedAt).toBeNull();
    expect(result.approval.approvedBy).toBeNull();
    expect(result.approval.approvedVia).toBeNull();
  });

  it('allows a manager to request approval', async () => {
    const client = await createUser({
      userId: 'client-approval-2',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-approval-1',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVAL-002');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await RepairItemCollection.create({
      repairId: repair._id,
      type: 'part',
      name: 'Brake pads',
      description: null,
      quantity: 1,
      unitPrice: 200,
      totalPrice: 200,
      source: 'service',
    });

    const result = await requestApprovalRepairService(repair._id.toString(), {
      userId: manager.userId,
      role: 'manager',
    });

    expect(result.status).toBe('awaiting_approval');
  });

  it('allows an owner to request approval', async () => {
    const client = await createUser({
      userId: 'client-approval-3',
      role: 'client',
    });

    const owner = await createUser({
      userId: 'owner-approval-1',
      role: 'owner',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVAL-003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await RepairItemCollection.create({
      repairId: repair._id,
      type: 'work',
      name: 'Additional diagnostics',
      description: null,
      quantity: 1,
      unitPrice: 100,
      totalPrice: 100,
      source: 'client',
    });

    const result = await requestApprovalRepairService(repair._id.toString(), {
      userId: owner.userId,
      role: 'owner',
    });

    expect(result.status).toBe('awaiting_approval');
  });

  it('rejects an unassigned mechanic', async () => {
    const client = await createUser({
      userId: 'client-approval-4',
      role: 'client',
    });

    const assignedMechanic = await createUser({
      userId: 'mechanic-approval-2',
      role: 'mechanic',
    });

    const anotherMechanic = await createUser({
      userId: 'mechanic-approval-3',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVAL-004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: assignedMechanic._id.toString(),
      status: 'in_progress',
    });

    await RepairItemCollection.create({
      repairId: repair._id,
      type: 'work',
      name: 'Additional work',
      description: null,
      quantity: 1,
      unitPrice: 100,
      totalPrice: 100,
      source: 'service',
    });

    await expect(
      requestApprovalRepairService(repair._id.toString(), {
        userId: anotherMechanic.userId,
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects a client', async () => {
    const client = await createUser({
      userId: 'client-approval-5',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-approval-4',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVAL-005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    await RepairItemCollection.create({
      repairId: repair._id,
      type: 'part',
      name: 'Oil filter',
      description: null,
      quantity: 1,
      unitPrice: 50,
      totalPrice: 50,
      source: 'client',
    });

    await expect(
      requestApprovalRepairService(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects a repair that is not in progress', async () => {
    const client = await createUser({
      userId: 'client-approval-6',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-approval-2',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVAL-006');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'accepted',
    });

    await RepairItemCollection.create({
      repairId: repair._id,
      type: 'work',
      name: 'Additional work',
      description: null,
      quantity: 1,
      unitPrice: 100,
      totalPrice: 100,
      source: 'service',
    });

    await expect(
      requestApprovalRepairService(repair._id.toString(), {
        userId: manager.userId,
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('rejects a repair without repair items', async () => {
    const client = await createUser({
      userId: 'client-approval-7',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-approval-3',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVAL-007');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await expect(
      requestApprovalRepairService(repair._id.toString(), {
        userId: manager.userId,
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('returns 404 when the repair does not exist', async () => {
    const manager = await createUser({
      userId: 'manager-approval-4',
      role: 'manager',
    });

    await expect(
      requestApprovalRepairService('507f1f77bcf86cd799439011', {
        userId: manager.userId,
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('approveRepair', () => {
  it('allows a client to approve their own repair via client', async () => {
    const client = await createUser({
      userId: 'client-approve-1',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-001');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'awaiting_approval',
    });

    const result = await approveRepairService(
      repair._id.toString(),
      {
        via: 'client',
      },
      {
        userId: client.userId,
        role: 'client',
      },
    );

    expect(result.status).toBe('in_progress');
    expect(result.approval.approvedVia).toBe('client');
    expect(result.approval.approvedBy?.toString()).toBe(client._id.toString());
    expect(result.approval.approvedAt).toBeInstanceOf(Date);
  });

  it('allows a manager to approve a repair via phone', async () => {
    const client = await createUser({
      userId: 'client-approve-2',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-approve-1',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-002');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'awaiting_approval',
    });

    const result = await approveRepairService(
      repair._id.toString(),
      {
        via: 'phone',
      },
      {
        userId: manager.userId,
        role: 'manager',
      },
    );

    expect(result.status).toBe('in_progress');
    expect(result.approval.approvedVia).toBe('phone');
    expect(result.approval.approvedBy?.toString()).toBe(manager._id.toString());
    expect(result.approval.approvedAt).toBeInstanceOf(Date);
  });

  it('allows an owner to approve a repair via phone', async () => {
    const client = await createUser({
      userId: 'client-approve-3',
      role: 'client',
    });

    const owner = await createUser({
      userId: 'owner-approve-1',
      role: 'owner',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-003');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'awaiting_approval',
    });

    const result = await approveRepairService(
      repair._id.toString(),
      {
        via: 'phone',
      },
      {
        userId: owner.userId,
        role: 'owner',
      },
    );

    expect(result.status).toBe('in_progress');
    expect(result.approval.approvedVia).toBe('phone');
    expect(result.approval.approvedBy?.toString()).toBe(owner._id.toString());
    expect(result.approval.approvedAt).toBeInstanceOf(Date);
  });

  it('rejects a mechanic', async () => {
    const client = await createUser({
      userId: 'client-approve-4',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-approve-1',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-004');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'awaiting_approval',
    });

    await expect(
      approveRepairService(
        repair._id.toString(),
        {
          via: 'phone',
        },
        {
          userId: mechanic.userId,
          role: 'mechanic',
        },
      ),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects a client approving another client repair', async () => {
    const client = await createUser({
      userId: 'client-approve-5',
      role: 'client',
    });

    const anotherClient = await createUser({
      userId: 'client-approve-6',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-005');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'awaiting_approval',
    });

    await expect(
      approveRepairService(
        repair._id.toString(),
        {
          via: 'client',
        },
        {
          userId: anotherClient.userId,
          role: 'client',
        },
      ),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects a client using phone approval', async () => {
    const client = await createUser({
      userId: 'client-approve-7',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-006');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'awaiting_approval',
    });

    await expect(
      approveRepairService(
        repair._id.toString(),
        {
          via: 'phone',
        },
        {
          userId: client.userId,
          role: 'client',
        },
      ),
    ).rejects.toMatchObject({
      status: 403,
    });
  });

  it('rejects a manager using client approval', async () => {
    const client = await createUser({
      userId: 'client-approve-8',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-approve-2',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-007');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'awaiting_approval',
    });

    await expect(
      approveRepairService(
        repair._id.toString(),
        {
          via: 'client',
        },
        {
          userId: manager.userId,
          role: 'manager',
        },
      ),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('rejects a repair that is not awaiting approval', async () => {
    const client = await createUser({
      userId: 'client-approve-9',
      role: 'client',
    });

    const manager = await createUser({
      userId: 'manager-approve-3',
      role: 'manager',
    });

    const car = await createCar(client._id.toString(), 'VIN-APPROVE-008');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await expect(
      approveRepairService(
        repair._id.toString(),
        {
          via: 'phone',
        },
        {
          userId: manager.userId,
          role: 'manager',
        },
      ),
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  it('returns 404 when the repair does not exist', async () => {
    const manager = await createUser({
      userId: 'manager-approve-4',
      role: 'manager',
    });

    await expect(
      approveRepairService(
        '507f1f77bcf86cd799439011',
        {
          via: 'phone',
        },
        {
          userId: manager.userId,
          role: 'manager',
        },
      ),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('cancelRepair', () => {
  it('cancels a pending repair by manager', async () => {
    const client = await createUser({
      userId: 'client-cancel-manager',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-CANCEL-MANAGER');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await cancelRepairService(repair._id.toString(), {
      userId: 'manager-cancel',
      role: 'manager',
    });

    const updatedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(updatedRepair?.status).toBe('cancelled');
  });

  it('cancels a pending repair by owner', async () => {
    const client = await createUser({
      userId: 'client-cancel-owner',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-CANCEL-OWNER');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await cancelRepairService(repair._id.toString(), {
      userId: 'owner-cancel',
      role: 'owner',
    });

    const updatedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(updatedRepair?.status).toBe('cancelled');
  });

  it('cancels a repair awaiting approval by manager', async () => {
    const client = await createUser({
      userId: 'client-cancel-approval',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-CANCEL-APPROVAL');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'awaiting_approval',
    });

    await cancelRepairService(repair._id.toString(), {
      userId: 'manager-cancel-approval',
      role: 'manager',
    });

    const updatedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(updatedRepair?.status).toBe('cancelled');
  });

  it('rejects a client cancelling a pending repair', async () => {
    const client = await createUser({
      userId: 'client-cancel-rejected',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-CANCEL-REJECTED');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await expect(
      cancelRepairService(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });

    const unchangedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(unchangedRepair?.status).toBe('pending');
  });

  it('rejects a mechanic cancelling a pending repair', async () => {
    const client = await createUser({
      userId: 'client-cancel-mechanic',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-CANCEL-MECHANIC');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'pending',
    });

    await expect(
      cancelRepairService(repair._id.toString(), {
        userId: 'mechanic-cancel',
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });

    const unchangedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(unchangedRepair?.status).toBe('pending');
  });

  it.each([
    'accepted',
    'in_progress',
    'waiting_parts',
    'completed',
    'cancelled',
  ] as RepairStatus[])(
    'rejects cancelling a repair with status %s',
    async (status) => {
      const client = await createUser({
        userId: `client-cancel-${status}`,
        role: 'client',
      });

      const car = await createCar(
        client._id.toString(),
        `VIN-CANCEL-${status}`,
      );

      const repair = await createRepairDocument({
        clientId: client._id.toString(),
        carId: car._id.toString(),
        status,
      });

      await expect(
        cancelRepairService(repair._id.toString(), {
          userId: 'manager-cancel-status',
          role: 'manager',
        }),
      ).rejects.toMatchObject({
        status: 400,
      });

      const unchangedRepair = await RepairCollection.findById(repair._id)
        .lean()
        .exec();

      expect(unchangedRepair?.status).toBe(status);
    },
  );

  it('rejects cancelling a missing repair', async () => {
    const missingRepairId = '507f1f77bcf86cd799439011';

    await expect(
      cancelRepairService(missingRepairId, {
        userId: 'manager-cancel-missing',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('completeRepair', () => {
  it('completes an in-progress repair by assigned mechanic', async () => {
    const client = await createUser({
      userId: 'client-complete-mechanic',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-complete',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-COMPLETE-MECHANIC');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    await completeRepairService(repair._id.toString(), {
      userId: mechanic.userId,
      role: 'mechanic',
    });

    const completedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(completedRepair?.status).toBe('completed');
    expect(completedRepair?.completedAt).toBeInstanceOf(Date);
  });

  it('completes an in-progress repair by manager', async () => {
    const client = await createUser({
      userId: 'client-complete-manager',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-complete-manager',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-COMPLETE-MANAGER');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    await completeRepairService(repair._id.toString(), {
      userId: 'manager-complete',
      role: 'manager',
    });

    const completedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(completedRepair?.status).toBe('completed');
    expect(completedRepair?.completedAt).toBeInstanceOf(Date);
  });

  it('completes an in-progress repair by owner', async () => {
    const client = await createUser({
      userId: 'client-complete-owner',
      role: 'client',
    });

    const mechanic = await createUser({
      userId: 'mechanic-complete-owner',
      role: 'mechanic',
    });

    const car = await createCar(client._id.toString(), 'VIN-COMPLETE-OWNER');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: mechanic._id.toString(),
      status: 'in_progress',
    });

    await completeRepairService(repair._id.toString(), {
      userId: 'owner-complete',
      role: 'owner',
    });

    const completedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(completedRepair?.status).toBe('completed');
    expect(completedRepair?.completedAt).toBeInstanceOf(Date);
  });

  it('rejects an unassigned mechanic from completing a repair', async () => {
    const client = await createUser({
      userId: 'client-complete-unassigned',
      role: 'client',
    });

    const assignedMechanic = await createUser({
      userId: 'mechanic-complete-assigned',
      role: 'mechanic',
    });

    const otherMechanic = await createUser({
      userId: 'mechanic-complete-other',
      role: 'mechanic',
    });

    const car = await createCar(
      client._id.toString(),
      'VIN-COMPLETE-UNASSIGNED',
    );

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      assignedMechanicId: assignedMechanic._id.toString(),
      status: 'in_progress',
    });

    await expect(
      completeRepairService(repair._id.toString(), {
        userId: otherMechanic.userId,
        role: 'mechanic',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });

    const unchangedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(unchangedRepair?.status).toBe('in_progress');
    expect(unchangedRepair?.completedAt).toBeNull();
  });

  it('rejects a client from completing a repair', async () => {
    const client = await createUser({
      userId: 'client-complete-client',
      role: 'client',
    });

    const car = await createCar(client._id.toString(), 'VIN-COMPLETE-CLIENT');

    const repair = await createRepairDocument({
      clientId: client._id.toString(),
      carId: car._id.toString(),
      status: 'in_progress',
    });

    await expect(
      completeRepairService(repair._id.toString(), {
        userId: client.userId,
        role: 'client',
      }),
    ).rejects.toMatchObject({
      status: 403,
    });

    const unchangedRepair = await RepairCollection.findById(repair._id)
      .lean()
      .exec();

    expect(unchangedRepair?.status).toBe('in_progress');
    expect(unchangedRepair?.completedAt).toBeNull();
  });

  it.each([
    'pending',
    'accepted',
    'waiting_parts',
    'awaiting_approval',
    'completed',
    'cancelled',
  ] as RepairStatus[])(
    'rejects completing a repair with status %s',
    async (status) => {
      const client = await createUser({
        userId: `client-complete-${status}`,
        role: 'client',
      });

      const mechanic = await createUser({
        userId: `mechanic-complete-${status}`,
        role: 'mechanic',
      });

      const car = await createCar(
        client._id.toString(),
        `VIN-COMPLETE-${status}`,
      );

      const repair = await createRepairDocument({
        clientId: client._id.toString(),
        carId: car._id.toString(),
        assignedMechanicId: mechanic._id.toString(),
        status,
      });

      await expect(
        completeRepairService(repair._id.toString(), {
          userId: mechanic.userId,
          role: 'mechanic',
        }),
      ).rejects.toMatchObject({
        status: 400,
      });

      const unchangedRepair = await RepairCollection.findById(repair._id)
        .lean()
        .exec();

      expect(unchangedRepair?.status).toBe(status);
      expect(unchangedRepair?.completedAt).toBeNull();
    },
  );

  it('rejects completing a missing repair', async () => {
    const missingRepairId = '507f1f77bcf86cd799439011';

    await expect(
      completeRepairService(missingRepairId, {
        userId: 'manager-complete-missing',
        role: 'manager',
      }),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});
