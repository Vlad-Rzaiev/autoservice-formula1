import bcrypt from 'bcrypt';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../../app.js';
import { UserCollection } from '../user/user.model.js';
import { CarCollection } from './car.model.js';
import mongoose from 'mongoose';

const getAccessToken = async (
  role: 'client' | 'manager' | 'mechanic' | 'owner',
): Promise<string> => {
  const password = 'TestPassword123!';
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

  const app = createApp();

  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email,
      password,
    })
    .expect(200);

  return response.body.data.accessToken;
};

describe('GET /api/v1/cars', () => {
  it('returns 401 when the user is not authenticated', async () => {
    const app = createApp();

    await request(app).get('/api/v1/cars').expect(401);
  });

  it('returns 200 when the user is a client', async () => {
    const accessToken = await getAccessToken('client');
    const app = createApp();

    await request(app)
      .get('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('returns 200 when the user is a manager', async () => {
    const accessToken = await getAccessToken('manager');
    const app = createApp();

    await request(app)
      .get('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('returns 200 when the user is a mechanic', async () => {
    const accessToken = await getAccessToken('mechanic');
    const app = createApp();

    await request(app)
      .get('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('returns 200 when the user is an owner', async () => {
    const accessToken = await getAccessToken('owner');
    const app = createApp();

    await request(app)
      .get('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('returns the cars for an authorized manager', async () => {
    const accessToken = await getAccessToken('manager');

    const owner = await UserCollection.create({
      userId: 'car-owner-1',
      firstName: 'John',
      lastName: 'Doe',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'car-owner@test.com',
      emailVerified: true,
      passwordHash: 'hashed-password',
      role: 'client',
      isActive: true,
    });

    await CarCollection.create([
      {
        ownerId: owner._id,
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        licensePlate: 'ABC123',
        vin: 'WBA12345678901234',
        mileage: 50000,
        photos: [],
        generation: 'G05',
        bodyType: 'suv',
        fuelType: 'diesel',
        transmission: 'automatic',
        engine: '3.0d',
        color: 'Black',
        registrationDate: new Date('2022-01-15'),
        countryOfRegistration: 'PL',
        notes: null,
      },
      {
        ownerId: owner._id,
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2021,
        licensePlate: 'XYZ789',
        vin: 'WDD12345678901234',
        mileage: 40000,
        photos: [],
        generation: 'W206',
        bodyType: 'sedan',
        fuelType: 'petrol',
        transmission: 'automatic',
        engine: '2.0',
        color: 'White',
        registrationDate: new Date('2021-05-20'),
        countryOfRegistration: 'PL',
        notes: null,
      },
    ]);

    const app = createApp();

    const response = await request(app)
      .get('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.items).toHaveLength(2);

    expect(response.body.data.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ownerId: owner._id.toString(),
          brand: 'BMW',
          model: 'X5',
          vin: 'WBA12345678901234',
        }),
        expect.objectContaining({
          ownerId: owner._id.toString(),
          brand: 'Mercedes-Benz',
          model: 'C-Class',
          vin: 'WDD12345678901234',
        }),
      ]),
    );
  });

  it('returns paginated cars', async () => {
    const accessToken = await getAccessToken('manager');

    const owner = await UserCollection.create({
      userId: 'pagination-owner',
      firstName: 'Pagination',
      lastName: 'Owner',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'pagination-owner@test.com',
      emailVerified: true,
      passwordHash: 'hashed-password',
      role: 'client',
      isActive: true,
    });

    await CarCollection.create(
      Array.from({ length: 3 }, (_, index) => ({
        ownerId: owner._id,
        brand: `Brand${index}`,
        model: `Model${index}`,
        year: 2020 + index,
        licensePlate: `CAR${index}`,
        vin: `WBA1234567890123${index}`,
        mileage: 10000 + index * 1000,
        photos: [],
        generation: null,
        bodyType: 'sedan' as const,
        fuelType: 'petrol' as const,
        transmission: 'automatic' as const,
        engine: null,
        color: null,
        registrationDate: null,
        countryOfRegistration: 'PL',
        notes: null,
      })),
    );

    const app = createApp();

    const response = await request(app)
      .get('/api/v1/cars?page=2&limit=2')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);

    expect(response.body.data.pagination).toEqual({
      page: 2,
      limit: 2,
      totalItems: 3,
      totalPages: 2,
    });
  });

  it('returns cars matching the search query', async () => {
    const accessToken = await getAccessToken('manager');

    const owner = await UserCollection.create({
      userId: 'search-owner',
      firstName: 'Search',
      lastName: 'Owner',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'search-owner@test.com',
      emailVerified: true,
      passwordHash: 'hashed-password',
      role: 'client',
      isActive: true,
    });

    await CarCollection.create([
      {
        ownerId: owner._id,
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        licensePlate: 'ABC123',
        vin: 'WBA12345678901234',
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
      },
      {
        ownerId: owner._id,
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2021,
        licensePlate: 'XYZ789',
        vin: 'WDD12345678901234',
        mileage: 40000,
        photos: [],
        generation: 'W206',
        bodyType: 'sedan',
        fuelType: 'petrol',
        transmission: 'automatic',
        engine: '2.0',
        color: 'White',
        registrationDate: null,
        countryOfRegistration: 'PL',
        notes: null,
      },
    ]);

    const app = createApp();

    const response = await request(app)
      .get('/api/v1/cars?search=bmw')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);

    expect(response.body.data.items[0]).toEqual(
      expect.objectContaining({
        brand: 'BMW',
        model: 'X5',
        generation: 'G05',
      }),
    );

    expect(response.body.data.pagination).toEqual({
      page: 1,
      limit: 20,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('returns cars filtered by ownerId', async () => {
    const accessToken = await getAccessToken('manager');

    const firstOwner = await UserCollection.create({
      userId: 'owner-filter-1',
      firstName: 'First',
      lastName: 'Owner',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'owner-filter-1@test.com',
      emailVerified: true,
      passwordHash: 'hashed-password',
      role: 'client',
      isActive: true,
    });

    const secondOwner = await UserCollection.create({
      userId: 'owner-filter-2',
      firstName: 'Second',
      lastName: 'Owner',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'owner-filter-2@test.com',
      emailVerified: true,
      passwordHash: 'hashed-password',
      role: 'client',
      isActive: true,
    });

    await CarCollection.create([
      {
        ownerId: firstOwner._id,
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        licensePlate: 'AAA111',
        vin: 'WBA12345678901234',
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
      },
      {
        ownerId: secondOwner._id,
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2021,
        licensePlate: 'BBB222',
        vin: 'WDD12345678901234',
        mileage: 40000,
        photos: [],
        generation: 'W206',
        bodyType: 'sedan',
        fuelType: 'petrol',
        transmission: 'automatic',
        engine: '2.0',
        color: 'White',
        registrationDate: null,
        countryOfRegistration: 'PL',
        notes: null,
      },
    ]);

    const app = createApp();

    const response = await request(app)
      .get(`/api/v1/cars?ownerId=${firstOwner._id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);

    expect(response.body.data.items[0]).toEqual(
      expect.objectContaining({
        ownerId: firstOwner._id.toString(),
        brand: 'BMW',
        model: 'X5',
      }),
    );

    expect(response.body.data.pagination).toEqual({
      page: 1,
      limit: 20,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('returns 400 for invalid query parameters', async () => {
    const accessToken = await getAccessToken('manager');

    const app = createApp();

    const response = await request(app)
      .get('/api/v1/cars?page=0&limit=101')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: 400,
        success: false,
      }),
    );
  });

  it('does not return soft-deleted cars when filtering by ownerId', async () => {
    const accessToken = await getAccessToken('owner');

    const client = await UserCollection.create({
      userId: 'client-get-inactive-owner',
      firstName: 'Inactive',
      lastName: 'Owner',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-get-inactive-owner@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    await CarCollection.create({
      ownerId: client._id,
      brand: 'Skoda',
      model: 'Octavia',
      year: 2021,
      licensePlate: null,
      vin: 'TMB12345678901234',
      mileage: null,
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
      isActive: false,
    });

    const app = createApp();

    const response = await request(app)
      .get(`/api/v1/cars?ownerId=${client._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.items).toHaveLength(0);
    expect(response.body.data.pagination.totalItems).toBe(0);
  });

  it('returns only own cars for a client even when another ownerId is provided', async () => {
    const accessToken = await getAccessToken('client');

    const currentClient = await UserCollection.findOne({
      userId: 'client-1',
    })
      .select('_id')
      .lean()
      .exec();

    const anotherClient = await UserCollection.create({
      userId: 'another-client',
      firstName: 'Another',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'another-client@test.com',
      emailVerified: true,
      passwordHash: 'hashed-password',
      role: 'client',
      isActive: true,
    });

    await CarCollection.create([
      {
        ownerId: currentClient!._id,
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        licensePlate: 'OWN111',
        vin: 'WBA12345678901234',
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
      },
      {
        ownerId: anotherClient._id,
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2021,
        licensePlate: 'OTHER1',
        vin: 'WDD12345678901234',
        mileage: 40000,
        photos: [],
        generation: 'W206',
        bodyType: 'sedan',
        fuelType: 'petrol',
        transmission: 'automatic',
        engine: '2.0',
        color: 'White',
        registrationDate: null,
        countryOfRegistration: 'PL',
        notes: null,
      },
    ]);

    const app = createApp();

    const response = await request(app)
      .get(`/api/v1/cars?ownerId=${anotherClient._id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.items[0]).toEqual(
      expect.objectContaining({
        ownerId: currentClient!._id.toString(),
        brand: 'BMW',
        model: 'X5',
        vin: 'WBA12345678901234',
      }),
    );
    expect(response.body.data.items[0].ownerId).not.toBe(
      anotherClient._id.toString(),
    );
  });
});

describe('POST /api/v1/cars', () => {
  it('returns 401 when creating a car without authentication', async () => {
    const app = createApp();

    const response = await request(app).post('/api/v1/cars').send({
      ownerId: new mongoose.Types.ObjectId().toString(),
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      vin: 'WBA12345678901234',
    });

    expect(response.status).toBe(401);
  });

  it('returns 403 when a mechanic tries to create a car', async () => {
    const accessToken = await getAccessToken('mechanic');
    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: new mongoose.Types.ObjectId().toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        vin: 'WBA12345678901234',
      });

    expect(response.status).toBe(403);
  });

  it('creates a car for the authenticated client', async () => {
    const accessToken = await getAccessToken('client');
    const client = await UserCollection.findOne({ userId: 'client-1' });

    expect(client).not.toBeNull();

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: client!._id.toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        vin: 'WBA12345678901234',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Car successfully created.');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        ownerId: client!._id.toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        vin: 'WBA12345678901234',
        photos: [],
        mileage: null,
      }),
    );
  });

  it('creates a car only for the authenticated client', async () => {
    const accessToken = await getAccessToken('client');

    const anotherClient = await UserCollection.create({
      userId: 'another-client-1',
      firstName: 'Another',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'another-client@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: anotherClient._id.toString(),
        brand: 'Mercedes-Benz',
        model: 'C-Class',
        year: 2023,
        vin: 'WDD12345678901234',
      })
      .expect(201);

    expect(response.body.data.ownerId).not.toBe(anotherClient._id.toString());
  });

  it('creates a car for a client when authenticated as manager', async () => {
    const accessToken = await getAccessToken('manager');

    const client = await UserCollection.create({
      userId: 'client-2',
      firstName: 'Test',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-2@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: client._id.toString(),
        brand: 'Mercedes-Benz',
        model: 'E-Class',
        year: 2023,
        vin: 'WDD12345678901234',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.ownerId).toBe(client._id.toString());
  });

  it('returns 403 when a manager tries to create a car for a non-client', async () => {
    const accessToken = await getAccessToken('manager');

    const owner = await UserCollection.create({
      userId: 'owner-2',
      firstName: 'Test',
      lastName: 'Owner',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'owner-2@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'owner',
      isActive: true,
    });

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: owner._id.toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        vin: 'WBA12345678901234',
      });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
  });

  it('creates a car for any user when authenticated as owner', async () => {
    const accessToken = await getAccessToken('owner');

    const mechanic = await UserCollection.create({
      userId: 'mechanic-2',
      firstName: 'Test',
      lastName: 'Mechanic',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'mechanic-2@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'mechanic',
      isActive: true,
    });

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: mechanic._id.toString(),
        brand: 'Audi',
        model: 'A6',
        year: 2024,
        vin: 'WAU12345678901234',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.ownerId).toBe(mechanic._id.toString());
  });

  it('returns 404 when the car owner does not exist', async () => {
    const accessToken = await getAccessToken('manager');

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: new mongoose.Types.ObjectId().toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        vin: 'WBA12345678901234',
      });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Car owner not found.');
  });

  it('returns 400 when the car owner is inactive', async () => {
    const accessToken = await getAccessToken('manager');

    const inactiveClient = await UserCollection.create({
      userId: 'inactive-client-1',
      firstName: 'Inactive',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'inactive-client@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: false,
    });

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: inactiveClient._id.toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        vin: 'WBA12345678901234',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Car owner is inactive.');
  });

  it('returns 400 for an invalid VIN', async () => {
    const accessToken = await getAccessToken('manager');

    const client = await UserCollection.create({
      userId: 'client-invalid-vin',
      firstName: 'Test',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-invalid-vin@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const app = createApp();

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: client._id.toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        vin: 'INVALID-VIN',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid request body');
  });

  it('returns 409 when the VIN already exists', async () => {
    const accessToken = await getAccessToken('manager');

    const client = await UserCollection.create({
      userId: 'client-duplicate-vin',
      firstName: 'Test',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-duplicate-vin@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const app = createApp();

    const carData = {
      ownerId: client._id.toString(),
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      vin: 'WBA12345678901234',
    };

    await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(carData)
      .expect(201);

    const response = await request(app)
      .post('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ...carData,
        brand: 'BMW',
        model: 'X6',
      });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('DUPLICATE_KEY');
    expect(response.body.message).toBe(
      'A record with this vin already exists.',
    );
  });
});

describe('PATCH /api/v1/cars/:id', () => {
  it('returns 401 when updating a car without authentication', async () => {
    const app = createApp();

    const car = await CarCollection.create({
      ownerId: new mongoose.Types.ObjectId(),
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: null,
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
    });

    const response = await request(app).patch(`/api/v1/cars/${car._id}`).send({
      mileage: 100000,
    });

    expect(response.status).toBe(401);
  });

  it('returns 403 when a mechanic tries to update a car', async () => {
    const accessToken = await getAccessToken('mechanic');

    const car = await CarCollection.create({
      ownerId: new mongoose.Types.ObjectId(),
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: null,
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
    });

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        mileage: 100000,
      });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Mechanic cannot update cars.');
  });

  it('updates a car owned by the authenticated client', async () => {
    const accessToken = await getAccessToken('client');

    const client = await UserCollection.findOne({ userId: 'client-1' });

    expect(client).not.toBeNull();

    const car = await CarCollection.create({
      ownerId: client!._id,
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: 50000,
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
    });

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        mileage: 75000,
        color: 'Black',
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Car successfully updated.');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: car._id.toString(),
        ownerId: client!._id.toString(),
        brand: 'BMW',
        model: 'X5',
        year: 2022,
        mileage: 75000,
        color: 'Black',
      }),
    );
  });

  it('returns 403 when a client tries to update another client car', async () => {
    const accessToken = await getAccessToken('client');

    const anotherClient = await UserCollection.create({
      userId: 'another-client-2',
      firstName: 'Another',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'another-client-2@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: anotherClient._id,
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: 50000,
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
    });

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        mileage: 75000,
      });

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Client can update only own cars.');
  });

  it('updates any car when authenticated as manager', async () => {
    const accessToken = await getAccessToken('manager');

    const client = await UserCollection.create({
      userId: 'client-manager-update',
      firstName: 'Test',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-manager-update@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: 50000,
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
    });

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        mileage: 90000,
        notes: 'Updated by manager',
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: car._id.toString(),
        ownerId: client._id.toString(),
        mileage: 90000,
        notes: 'Updated by manager',
      }),
    );
  });

  it('updates any car when authenticated as owner', async () => {
    const accessToken = await getAccessToken('owner');

    const client = await UserCollection.create({
      userId: 'client-owner-update',
      firstName: 'Test',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-owner-update@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'Audi',
      model: 'A6',
      year: 2023,
      licensePlate: null,
      vin: 'WAU12345678901234',
      mileage: 40000,
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
    });

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        mileage: 60000,
        color: 'Black',
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: car._id.toString(),
        ownerId: client._id.toString(),
        mileage: 60000,
        color: 'Black',
      }),
    );
  });

  it('returns 404 when the car does not exist', async () => {
    const accessToken = await getAccessToken('manager');

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${new mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        mileage: 100000,
      });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Car not found.');
  });

  it('does not allow changing ownerId through PATCH', async () => {
    const accessToken = await getAccessToken('manager');

    const firstClient = await UserCollection.create({
      userId: 'client-owner-protected-1',
      firstName: 'First',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-owner-protected-1@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const secondClient = await UserCollection.create({
      userId: 'client-owner-protected-2',
      firstName: 'Second',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-owner-protected-2@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: firstClient._id,
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: 50000,
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
    });

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ownerId: secondClient._id.toString(),
        mileage: 75000,
      })
      .expect(200);

    expect(response.body.data.ownerId).toBe(firstClient._id.toString());

    const updatedCar = await CarCollection.findById(car._id).lean();

    expect(updatedCar?.ownerId.toString()).toBe(firstClient._id.toString());
    expect(updatedCar?.mileage).toBe(75000);
  });

  it('returns 400 when no fields are provided', async () => {
    const accessToken = await getAccessToken('manager');

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${new mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid request body');
  });

  it('returns 409 when updating to an existing VIN', async () => {
    const accessToken = await getAccessToken('manager');

    const client = await UserCollection.create({
      userId: 'client-duplicate-update-vin',
      firstName: 'Test',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-duplicate-update-vin@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const firstCar = await CarCollection.create({
      ownerId: client._id,
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: null,
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
    });

    const secondCar = await CarCollection.create({
      ownerId: client._id,
      brand: 'Audi',
      model: 'A6',
      year: 2023,
      licensePlate: null,
      vin: 'WAU12345678901234',
      mileage: null,
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
    });

    const app = createApp();

    const response = await request(app)
      .patch(`/api/v1/cars/${secondCar._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        vin: firstCar.vin,
      });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    expect(response.body.code).toBe('DUPLICATE_KEY');
    expect(response.body.message).toBe(
      'A record with this vin already exists.',
    );
  });

  it('returns 400 for an invalid car id', async () => {
    const accessToken = await getAccessToken('manager');

    const app = createApp();

    const response = await request(app)
      .patch('/api/v1/cars/invalid-id')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        mileage: 100000,
      })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid car id.');
  });
});

describe('DELETE /api/v1/cars/:id', () => {
  it('soft deletes a car when authenticated as owner', async () => {
    const accessToken = await getAccessToken('owner');

    const client = await UserCollection.create({
      userId: 'client-delete-owner',
      firstName: 'Delete',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-delete-owner@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      licensePlate: null,
      vin: 'WBA12345678901234',
      mileage: null,
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
    });

    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Car successfully deleted.');
    expect(response.body.data._id).toBe(car._id.toString());
    expect(response.body.data.isActive).toBe(false);

    const deletedCar = await CarCollection.findById(car._id).lean().exec();

    expect(deletedCar).not.toBeNull();
    expect(deletedCar?.isActive).toBe(false);
  });

  it('soft deletes own car when authenticated as client', async () => {
    const accessToken = await getAccessToken('client');

    const client = await UserCollection.findOne({
      userId: 'client-1',
    }).exec();

    if (!client) {
      throw new Error('Client test user not found.');
    }

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2021,
      licensePlate: null,
      vin: 'WDD12345678901234',
      mileage: null,
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
    });

    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data._id).toBe(car._id.toString());
    expect(response.body.data.isActive).toBe(false);

    const deletedCar = await CarCollection.findById(car._id).lean().exec();

    expect(deletedCar?.isActive).toBe(false);
  });

  it('returns 403 when a client tries to delete another client car', async () => {
    const accessToken = await getAccessToken('client');

    const anotherClient = await UserCollection.create({
      userId: 'another-client-delete',
      firstName: 'Another',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'another-client-delete@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: anotherClient._id,
      brand: 'Audi',
      model: 'A6',
      year: 2023,
      licensePlate: null,
      vin: 'WAU12345678901234',
      mileage: null,
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
    });

    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Client can delete only own cars.');

    const unchangedCar = await CarCollection.findById(car._id).lean().exec();

    expect(unchangedCar?.isActive).toBe(true);
  });

  it('returns 403 when a manager tries to delete a car', async () => {
    const accessToken = await getAccessToken('manager');

    const client = await UserCollection.create({
      userId: 'client-delete-manager',
      firstName: 'Manager',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-delete-manager@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'Volkswagen',
      model: 'Passat',
      year: 2020,
      licensePlate: null,
      vin: 'WVW12345678901234',
      mileage: null,
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
    });

    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Manager cannot delete cars.');

    const unchangedCar = await CarCollection.findById(car._id).lean().exec();

    expect(unchangedCar?.isActive).toBe(true);
  });

  it('returns 403 when a mechanic tries to delete a car', async () => {
    const accessToken = await getAccessToken('mechanic');

    const client = await UserCollection.create({
      userId: 'client-delete-mechanic',
      firstName: 'Mechanic',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-delete-mechanic@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'Toyota',
      model: 'Camry',
      year: 2021,
      licensePlate: null,
      vin: 'JTD12345678901234',
      mileage: null,
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
    });

    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Mechanic cannot delete cars.');

    const unchangedCar = await CarCollection.findById(car._id).lean().exec();

    expect(unchangedCar?.isActive).toBe(true);
  });

  it('returns 401 when deleting a car without authentication', async () => {
    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${new mongoose.Types.ObjectId()}`)
      .expect(401);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Authorization header is required.');
  });

  it('returns 404 when the car does not exist', async () => {
    const accessToken = await getAccessToken('owner');

    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${new mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Car not found.');
  });

  it('returns 404 when trying to delete an inactive car', async () => {
    const accessToken = await getAccessToken('owner');

    const client = await UserCollection.create({
      userId: 'client-delete-inactive',
      firstName: 'Inactive',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-delete-inactive@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'Ford',
      model: 'Focus',
      year: 2020,
      licensePlate: null,
      vin: 'WF012345678901234',
      mileage: null,
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
      isActive: false,
    });

    const app = createApp();

    const response = await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Car not found.');

    const inactiveCar = await CarCollection.findById(car._id).lean().exec();

    expect(inactiveCar?.isActive).toBe(false);
  });

  it('does not return a soft-deleted car in GET /cars', async () => {
    const accessToken = await getAccessToken('owner');

    const client = await UserCollection.create({
      userId: 'client-delete-get',
      firstName: 'Get',
      lastName: 'Client',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client-delete-get@test.com',
      emailVerified: true,
      passwordHash: await bcrypt.hash('TestPassword123!', 10),
      role: 'client',
      isActive: true,
    });

    const car = await CarCollection.create({
      ownerId: client._id,
      brand: 'Volvo',
      model: 'XC60',
      year: 2022,
      licensePlate: null,
      vin: 'YV123456789012345',
      mileage: null,
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
    });

    const app = createApp();

    await request(app)
      .delete(`/api/v1/cars/${car._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const response = await request(app)
      .get('/api/v1/cars')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.data.items).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: car._id.toString(),
        }),
      ]),
    );
  });

  it('returns 400 for an invalid car id', async () => {
    const accessToken = await getAccessToken('owner');

    const app = createApp();

    const response = await request(app)
      .delete('/api/v1/cars/invalid-id')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid car id.');
  });
});
