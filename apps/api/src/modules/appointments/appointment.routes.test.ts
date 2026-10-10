import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { UserRole } from '@autoservice/contracts';
import { createApp } from '../../app.js';
import { AppointmentCollection } from './appointment.model.js';
import { CarCollection } from '../cars/car.model.js';
import { UserCollection } from '../user/user.model.js';

const password = 'TestPassword123!';

const getAccessToken = async (role: UserRole): Promise<string> => {
  const email = `${role}@test.com`;

  await UserCollection.create({
    userId: `${role}-1`,
    firstName: 'Test',
    lastName: role,
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email,
    emailVerified: true,
    passwordHash: await bcrypt.hash(password, 10),
    role,
    isActive: true,
  });

  const response = await request(createApp())
    .post('/api/v1/auth/login')
    .send({ email, password })
    .expect(200);

  return response.body.data.accessToken;
};

const createClient = async (userId = 'appointment-client'): Promise<string> => {
  const client = await UserCollection.create({
    userId,
    firstName: 'Test',
    lastName: 'Client',
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: `${userId}@test.com`,
    emailVerified: true,
    passwordHash: 'hashed-password',
    role: 'client',
    isActive: true,
  });

  return client._id.toString();
};

const createMechanic = async (
  userId = 'appointment-mechanic',
): Promise<string> => {
  const mechanic = await UserCollection.create({
    userId,
    firstName: 'Test',
    lastName: 'Mechanic',
    photo: null,
    gender: null,
    birthDate: null,
    phone: null,
    email: `${userId}@test.com`,
    emailVerified: true,
    passwordHash: 'hashed-password',
    role: 'mechanic',
    isActive: true,
  });

  return mechanic._id.toString();
};

const createCar = async (ownerId: string, vin = 'WBA12345678901234') => {
  return CarCollection.create({
    ownerId,
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    licensePlate: 'ABC123',
    vin,
    mileage: 50000,
    photos: [],
    generation: 'G05',
    bodyType: 'suv',
    fuelType: 'diesel',
    transmission: 'automatic',
    engine: '3.0d',
    color: 'Black',
    registrationDate: null,
    countryOfRegistration: 'PL',
    notes: null,
    isActive: true,
  });
};

const createAppointment = async ({
  clientId,
  carId,
  assignedMechanicId = null,
  status = 'pending',
  title = 'Engine diagnostics',
  scheduledStart = '2030-06-10T10:00:00.000Z',
  scheduledEnd = '2030-06-10T11:00:00.000Z',
}: {
  clientId: string;
  carId: string;
  assignedMechanicId?: string | null;
  status?:
    | 'pending'
    | 'confirmed'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'no_show';
  title?: string;
  scheduledStart?: string;
  scheduledEnd?: string;
}) => {
  return AppointmentCollection.create({
    clientId,
    carId,
    serviceId: null,
    assignedMechanicId,
    scheduledStart: new Date(scheduledStart),
    scheduledEnd: new Date(scheduledEnd),
    status,
    title,
    description: 'Test appointment description',
    notes: null,
    repairId: null,
  });
};

const appointmentPayload = (clientId: string, carId: string) => ({
  clientId,
  carId,
  scheduledStart: '2030-07-10T10:00:00.000Z',
  scheduledEnd: '2030-07-10T11:00:00.000Z',
  title: 'Engine diagnostics',
  description: 'Check engine warning light',
  notes: 'Customer will arrive on time',
});

const auth = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

describe('GET /api/v1/appointments', () => {
  it('returns 401 when the user is not authenticated', async () => {
    await request(createApp()).get('/api/v1/appointments').expect(401);
  });

  it('returns appointments for an authenticated manager', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);

    await createAppointment({
      clientId,
      carId: car._id.toString(),
    });

    const response = await request(createApp())
      .get('/api/v1/appointments')
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointments successfully retrieved.');
    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.items[0]).toEqual(
      expect.objectContaining({
        clientId,
        carId: car._id.toString(),
        title: 'Engine diagnostics',
        status: 'pending',
      }),
    );
  });

  it('returns only the authenticated client appointments', async () => {
    const accessToken = await getAccessToken('client');

    const authenticatedClient = await UserCollection.findOne({
      userId: 'client-1',
    }).exec();

    expect(authenticatedClient).not.toBeNull();

    const otherClientId = await createClient('another-appointment-client');
    const ownCar = await createCar(authenticatedClient!._id.toString());
    const otherCar = await createCar(otherClientId, 'WBA12345678901235');

    await createAppointment({
      clientId: authenticatedClient!._id.toString(),
      carId: ownCar._id.toString(),
      title: 'Own appointment',
    });

    await createAppointment({
      clientId: otherClientId,
      carId: otherCar._id.toString(),
      title: 'Another client appointment',
    });

    const response = await request(createApp())
      .get('/api/v1/appointments')
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.items[0].title).toBe('Own appointment');
  });

  it('returns only appointments assigned to the authenticated mechanic', async () => {
    const accessToken = await getAccessToken('mechanic');

    const authenticatedMechanic = await UserCollection.findOne({
      userId: 'mechanic-1',
    }).exec();

    expect(authenticatedMechanic).not.toBeNull();

    const clientId = await createClient();
    const car = await createCar(clientId);
    const otherMechanicId = await createMechanic('another-mechanic');

    await createAppointment({
      clientId,
      carId: car._id.toString(),
      assignedMechanicId: authenticatedMechanic!._id.toString(),
      title: 'Assigned appointment',
    });

    await createAppointment({
      clientId,
      carId: car._id.toString(),
      assignedMechanicId: otherMechanicId,
      title: 'Other mechanic appointment',
      scheduledStart: '2030-06-11T10:00:00.000Z',
      scheduledEnd: '2030-06-11T11:00:00.000Z',
    });

    const response = await request(createApp())
      .get('/api/v1/appointments')
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.items[0].title).toBe('Assigned appointment');
  });

  it('filters appointments by status', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);

    await createAppointment({
      clientId,
      carId: car._id.toString(),
      status: 'pending',
      title: 'Pending appointment',
    });

    await createAppointment({
      clientId,
      carId: car._id.toString(),
      status: 'confirmed',
      title: 'Confirmed appointment',
      scheduledStart: '2030-06-11T10:00:00.000Z',
      scheduledEnd: '2030-06-11T11:00:00.000Z',
    });

    const response = await request(createApp())
      .get('/api/v1/appointments?status=confirmed')
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.items[0].status).toBe('confirmed');
    expect(response.body.data.pagination.totalItems).toBe(1);
  });

  it('returns paginated appointments', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);

    for (let index = 0; index < 3; index += 1) {
      await createAppointment({
        clientId,
        carId: car._id.toString(),
        title: `Appointment ${index + 1}`,
        scheduledStart: `2030-06-${10 + index}T10:00:00.000Z`,
        scheduledEnd: `2030-06-${10 + index}T11:00:00.000Z`,
      });
    }

    const response = await request(createApp())
      .get('/api/v1/appointments?page=2&limit=2')
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.pagination).toEqual({
      page: 2,
      limit: 2,
      totalItems: 3,
      totalPages: 2,
    });
  });

  it('returns 400 for invalid query parameters', async () => {
    const accessToken = await getAccessToken('manager');

    const response = await request(createApp())
      .get('/api/v1/appointments?page=0&limit=101')
      .set(auth(accessToken))
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});

describe('GET /api/v1/appointments/:appointmentId', () => {
  it('returns 401 when the user is not authenticated', async () => {
    await request(createApp())
      .get(`/api/v1/appointments/${new mongoose.Types.ObjectId()}`)
      .expect(401);
  });

  it('returns an appointment for an authorized manager', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);
    const appointment = await createAppointment({
      clientId,
      carId: car._id.toString(),
    });

    const response = await request(createApp())
      .get(`/api/v1/appointments/${appointment._id}`)
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment successfully retrieved.');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: appointment._id.toString(),
        title: 'Engine diagnostics',
        clientId,
        carId: car._id.toString(),
      }),
    );
  });

  it('returns 403 when a client accesses another client appointment', async () => {
    const accessToken = await getAccessToken('client');
    const otherClientId = await createClient('another-client');
    const car = await createCar(otherClientId);
    const appointment = await createAppointment({
      clientId: otherClientId,
      carId: car._id.toString(),
    });

    const response = await request(createApp())
      .get(`/api/v1/appointments/${appointment._id}`)
      .set(auth(accessToken))
      .expect(403);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      'You do not have access to this appointment.',
    );
  });

  it('returns 404 when the appointment does not exist', async () => {
    const accessToken = await getAccessToken('manager');

    const response = await request(createApp())
      .get(`/api/v1/appointments/${new mongoose.Types.ObjectId()}`)
      .set(auth(accessToken))
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Appointment not found.');
  });
});

describe('POST /api/v1/appointments', () => {
  it('returns 401 when creating an appointment without authentication', async () => {
    const response = await request(createApp())
      .post('/api/v1/appointments')
      .send({ title: 'Engine diagnostics' })
      .expect(401);

    expect(response.body.success).toBe(false);
  });

  it('creates an appointment for the authenticated client', async () => {
    const accessToken = await getAccessToken('client');
    const client = await UserCollection.findOne({
      userId: 'client-1',
    }).exec();

    expect(client).not.toBeNull();

    const car = await createCar(client!._id.toString());

    const response = await request(createApp())
      .post('/api/v1/appointments')
      .set(auth(accessToken))
      .send(appointmentPayload(client!._id.toString(), car._id.toString()))
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment successfully created.');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        clientId: client!._id.toString(),
        carId: car._id.toString(),
        title: 'Engine diagnostics',
        status: 'pending',
      }),
    );
  });

  it('uses the authenticated client instead of the clientId from the request', async () => {
    const accessToken = await getAccessToken('client');

    const authenticatedClient = await UserCollection.findOne({
      userId: 'client-1',
      role: 'client',
    })
      .select('_id')
      .lean()
      .exec();

    expect(authenticatedClient).not.toBeNull();

    const anotherClientId = await createClient('another-client-1');
    const car = await createCar(authenticatedClient!._id.toString());

    const response = await request(createApp())
      .post('/api/v1/appointments')
      .set(auth(accessToken))
      .send({
        ...appointmentPayload(anotherClientId, car._id.toString()),
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.clientId).toBe(
      authenticatedClient!._id.toString(),
    );
    expect(response.body.data.clientId).not.toBe(anotherClientId);
  });

  it('returns 403 when a mechanic tries to create an appointment', async () => {
    const accessToken = await getAccessToken('mechanic');
    const clientId = await createClient();
    const car = await createCar(clientId);

    const response = await request(createApp())
      .post('/api/v1/appointments')
      .set(auth(accessToken))
      .send(appointmentPayload(clientId, car._id.toString()))
      .expect(403);

    expect(response.body.success).toBe(false);
  });

  it('returns 400 when the request body is invalid', async () => {
    const accessToken = await getAccessToken('manager');

    const response = await request(createApp())
      .post('/api/v1/appointments')
      .set(auth(accessToken))
      .send({
        title: '',
        scheduledStart: 'not-a-date',
      })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid request body');
  });
});

describe('PATCH /api/v1/appointments/:appointmentId', () => {
  it('returns 401 when updating an appointment without authentication', async () => {
    const response = await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}`)
      .send({ title: 'Updated title' })
      .expect(401);

    expect(response.body.success).toBe(false);
  });

  it('updates an appointment when authenticated as manager', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);
    const appointment = await createAppointment({
      clientId,
      carId: car._id.toString(),
    });

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${appointment._id}`)
      .set(auth(accessToken))
      .send({
        title: 'Updated diagnostics',
        description: 'Updated description',
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment successfully updated.');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: appointment._id.toString(),
        title: 'Updated diagnostics',
        description: 'Updated description',
      }),
    );
  });

  it('returns 400 when the update body is empty', async () => {
    const accessToken = await getAccessToken('manager');

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}`)
      .set(auth(accessToken))
      .send({})
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid request body');
  });

  it('returns 403 when a mechanic tries to update an appointment', async () => {
    const accessToken = await getAccessToken('mechanic');

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}`)
      .set(auth(accessToken))
      .send({ title: 'Updated title' })
      .expect(403);

    expect(response.body.success).toBe(false);
  });
});

describe('Appointment status routes', () => {
  it('returns 401 when confirming without authentication', async () => {
    await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}/confirm`)
      .expect(401);
  });

  it('confirms an appointment when authenticated as manager', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);
    const appointment = await createAppointment({
      clientId,
      carId: car._id.toString(),
    });

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${appointment._id}/confirm`)
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment successfully confirmed.');
    expect(response.body.data.status).toBe('confirmed');
  });

  it('returns 403 when a client tries to confirm an appointment', async () => {
    const accessToken = await getAccessToken('client');

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}/confirm`)
      .set(auth(accessToken))
      .expect(403);

    expect(response.body.success).toBe(false);
  });

  it('starts an appointment when authenticated as an assigned mechanic', async () => {
    const accessToken = await getAccessToken('mechanic');
    const mechanic = await UserCollection.findOne({
      userId: 'mechanic-1',
    }).exec();

    expect(mechanic).not.toBeNull();

    const clientId = await createClient();
    const car = await createCar(clientId);
    const appointment = await createAppointment({
      clientId,
      carId: car._id.toString(),
      assignedMechanicId: mechanic!._id.toString(),
      status: 'confirmed',
    });

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${appointment._id}/start`)
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment successfully started.');
    expect(response.body.data.status).toBe('in_progress');
  });

  it('returns 403 when a client tries to start an appointment', async () => {
    const accessToken = await getAccessToken('client');

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}/start`)
      .set(auth(accessToken))
      .expect(403);

    expect(response.body.success).toBe(false);
  });

  it('completes an appointment when authenticated as an assigned mechanic', async () => {
    const accessToken = await getAccessToken('mechanic');
    const mechanic = await UserCollection.findOne({
      userId: 'mechanic-1',
    }).exec();

    expect(mechanic).not.toBeNull();

    const clientId = await createClient();
    const car = await createCar(clientId);
    const appointment = await createAppointment({
      clientId,
      carId: car._id.toString(),
      assignedMechanicId: mechanic!._id.toString(),
      status: 'in_progress',
    });

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${appointment._id}/complete`)
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment successfully completed.');
    expect(response.body.data.status).toBe('completed');
  });

  it('cancels an appointment when authenticated as manager', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);
    const appointment = await createAppointment({
      clientId,
      carId: car._id.toString(),
    });

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${appointment._id}/cancel`)
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment successfully cancelled.');
    expect(response.body.data.status).toBe('cancelled');
  });

  it('returns 403 when a mechanic tries to cancel an appointment', async () => {
    const accessToken = await getAccessToken('mechanic');

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}/cancel`)
      .set(auth(accessToken))
      .expect(403);

    expect(response.body.success).toBe(false);
  });

  it('marks an appointment as no-show when authenticated as manager', async () => {
    const accessToken = await getAccessToken('manager');
    const clientId = await createClient();
    const car = await createCar(clientId);
    const appointment = await createAppointment({
      clientId,
      carId: car._id.toString(),
      status: 'confirmed',
    });

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${appointment._id}/no-show`)
      .set(auth(accessToken))
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Appointment marked as no-show.');
    expect(response.body.data.status).toBe('no_show');
  });

  it('returns 403 when a client tries to mark an appointment as no-show', async () => {
    const accessToken = await getAccessToken('client');

    const response = await request(createApp())
      .patch(`/api/v1/appointments/${new mongoose.Types.ObjectId()}/no-show`)
      .set(auth(accessToken))
      .expect(403);

    expect(response.body.success).toBe(false);
  });
});
