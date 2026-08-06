import type { ServiceDto } from '@autoservice/contracts';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../../app.js';
import { ServiceCollection } from './service.model.js';
import { createServiceFixture } from '../../test/factories/service.factory.js';
import { createServicePayloadFixture } from '../../test/factories/create-service-payload.factory.js';

describe('GET /api/v1/services', () => {
  it('returns an empty services response when no services exist', async () => {
    const app = createApp();

    const response = await request(app).get('/api/v1/services').expect(200);

    expect(response.body).toMatchObject({
      status: 200,
      success: true,
      message: 'Successfully found services.',
    });

    expect(response.body.data).toEqual([]);
  });

  it('returns only active services', async () => {
    const app = createApp();

    await ServiceCollection.insertMany([
      createServiceFixture({
        slug: 'active-service',
        sortOrder: 1,
        isActive: true,
      }),
      createServiceFixture({
        slug: 'hidden-service',
        sortOrder: 2,
        isActive: false,
      }),
    ]);

    const response = await request(app).get('/api/v1/services').expect(200);

    const returnedServices = response.body.data as ServiceDto[];

    expect(returnedServices).toHaveLength(1);
    expect(returnedServices.map((service) => service.slug)).toEqual([
      'active-service',
    ]);
    expect(returnedServices.every((service) => service.isActive)).toBe(true);
  });

  it('returns services sorted by sortOrder in ascending order', async () => {
    const app = createApp();

    await ServiceCollection.insertMany([
      createServiceFixture({
        slug: 'brake-system',
        category: 'chassis-and-steering',
        iconKey: 'disc-3',
        sortOrder: 3,
      }),
      createServiceFixture({
        slug: 'diagnostics',
        sortOrder: 1,
      }),
      createServiceFixture({
        slug: 'engine-repair',
        category: 'engine-and-transmission',
        iconKey: 'settings',
        sortOrder: 2,
      }),
    ]);

    const response = await request(app).get('/api/v1/services').expect(200);
    const returnedServices = response.body.data as ServiceDto[];

    expect(returnedServices.map((service) => service.sortOrder)).toEqual([
      1, 2, 3,
    ]);
    expect(returnedServices.map((service) => service.slug)).toEqual([
      'diagnostics',
      'engine-repair',
      'brake-system',
    ]);
  });
});

describe('GET /api/v1/services/:serviceSlug', () => {
  it('returns an active service by slug', async () => {
    const app = createApp();

    await ServiceCollection.create(
      createServiceFixture({
        slug: 'engine-repair',
        category: 'engine-and-transmission',
        iconKey: 'settings',
        sortOrder: 1,
      }),
    );

    const response = await request(app)
      .get('/api/v1/services/engine-repair')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 200,
      success: true,
      message: 'Successfully found service with slug engine-repair.',
    });

    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        slug: 'engine-repair',
        category: 'engine-and-transmission',
        iconKey: 'settings',
        featured: true,
        sortOrder: 1,
        isActive: true,
        translations: expect.objectContaining({
          uk: expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
          }),
          en: expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
          }),
          pl: expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
          }),
        }),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
    expect(response.body.data).not.toHaveProperty('__v');

    const createdAt = new Date(response.body.data.createdAt);
    const updatedAt = new Date(response.body.data.updatedAt);

    expect(Number.isNaN(createdAt.getTime())).toBe(false);
    expect(Number.isNaN(updatedAt.getTime())).toBe(false);

    expect(updatedAt.getTime()).toBeGreaterThanOrEqual(createdAt.getTime());
  });

  it('returns 400 when serviceSlug format is invalid', async () => {
    const app = createApp();

    const invalidServiceSlug = 'Invalid Slug!';
    const encodedServiceSlug = encodeURIComponent(invalidServiceSlug);

    const response = await request(app)
      .get(`/api/v1/services/${encodedServiceSlug}`)
      .expect(400);

    expect(response.body).toMatchObject({
      status: 400,
      success: false,
      code: 'HTTP_400',
    });
  });

  it('returns 404 when the service does not exist', async () => {
    const app = createApp();

    const response = await request(app)
      .get('/api/v1/services/not-existing')
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      success: false,
      message: 'Service not found.',
    });
  });

  it('returns 404 when the service exists but is inactive', async () => {
    const app = createApp();

    await ServiceCollection.create(
      createServiceFixture({
        slug: 'hidden-service',
        sortOrder: 1,
        isActive: false,
      }),
    );

    const response = await request(app)
      .get('/api/v1/services/hidden-service')
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      success: false,
      message: 'Service not found.',
    });
  });
});

describe('POST /api/v1/services', () => {
  it('creates a service', async () => {
    const app = createApp();

    const createServicePayload = createServicePayloadFixture();

    const response = await request(app)
      .post('/api/v1/services')
      .send(createServicePayload)
      .expect(201);

    expect(response.body).toMatchObject({
      status: 201,
      success: true,
      message: 'Service successfully created.',
    });

    expect(response.body.data).toMatchObject({
      ...createServicePayload,
      sortOrder: 1,
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('persists the created service in MongoDB', async () => {
    const app = createApp();

    const createServicePayload = createServicePayloadFixture();

    await request(app)
      .post('/api/v1/services')
      .send(createServicePayload)
      .expect(201);

    const createdService = await ServiceCollection.findOne({
      slug: 'diagnostics',
    })
      .lean()
      .exec();

    if (!createdService) {
      throw new Error('Expected the created service to exist in MongoDB.');
    }

    expect(createdService).toMatchObject({
      ...createServicePayload,
      sortOrder: 1,
    });

    expect(createdService.createdAt).toBeInstanceOf(Date);
    expect(createdService.updatedAt).toBeInstanceOf(Date);
  });

  it('assigns consecutive sortOrder values', async () => {
    const app = createApp();

    const firstServicePayload = createServicePayloadFixture({
      slug: 'first-service',
    });

    const secondServicePayload = createServicePayloadFixture({
      slug: 'second-service',
    });

    const firstResponse = await request(app)
      .post('/api/v1/services')
      .send(firstServicePayload)
      .expect(201);

    const secondResponse = await request(app)
      .post('/api/v1/services')
      .send(secondServicePayload)
      .expect(201);

    expect(firstResponse.body.data.sortOrder).toBe(1);
    expect(secondResponse.body.data.sortOrder).toBe(2);
  });

  it('returns 400 when slug is missing', async () => {
    const app = createApp();

    const validServicePayload = createServicePayloadFixture();

    const { slug: _removedSlug, ...payloadWithoutSlug } = validServicePayload;

    const response = await request(app)
      .post('/api/v1/services')
      .send(payloadWithoutSlug)
      .expect(400);

    expect(response.body).toMatchObject({
      status: 400,
      success: false,
      code: 'HTTP_400',
      message: 'Invalid request body',
    });

    expect(await ServiceCollection.countDocuments()).toBe(0);
  });

  it('returns 400 when slug format is invalid', async () => {
    const app = createApp();

    const invalidServicePayload = createServicePayloadFixture({
      slug: 'Invalid Slug!',
    });

    const response = await request(app)
      .post('/api/v1/services')
      .send(invalidServicePayload)
      .expect(400);

    expect(response.body).toMatchObject({
      status: 400,
      success: false,
      code: 'HTTP_400',
      message: 'Invalid request body',
      details: {
        fieldErrors: {
          slug: [
            'Slug must contain only lowercase letters, numbers, and single hyphens.',
          ],
        },
      },
    });

    expect(await ServiceCollection.countDocuments()).toBe(0);
  });

  it('returns 409 when slug already exists', async () => {
    const app = createApp();

    const createServicePayload = createServicePayloadFixture();

    await request(app)
      .post('/api/v1/services')
      .send(createServicePayload)
      .expect(201);

    const duplicateResponse = await request(app)
      .post('/api/v1/services')
      .send(createServicePayload)
      .expect(409);

    expect(duplicateResponse.body).toMatchObject({
      status: 409,
      success: false,
      code: 'DUPLICATE_KEY',
      message: 'A record with this slug already exists.',
    });

    expect(await ServiceCollection.countDocuments()).toBe(1);
  });
});
