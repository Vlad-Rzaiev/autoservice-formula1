import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../../app.js';

import { CompletedWorksCollection } from './completed-works.model.js';
import { createCompletedWorkFixture } from '../../test/factories/completed-works.factory.js';
import { CompletedWorkDto } from '@autoservice/contracts';

describe('GET /api/v1/completed-works', () => {
  it('returns an empty completed works response when no completed works exist', async () => {
    const app = createApp();

    const response = await request(app)
      .get('/api/v1/completed-works')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 200,
      success: true,
      message: 'Successfully found completed works.',
    });

    expect(response.body.data).toEqual([]);
  });

  it('returns only active completed works', async () => {
    const app = createApp();

    await CompletedWorksCollection.insertMany([
      createCompletedWorkFixture({
        slug: 'active-completed-work',
        sortOrder: 1,
        isActive: true,
      }),
      createCompletedWorkFixture({
        slug: 'hidden-completed-work',
        sortOrder: 2,
        isActive: false,
      }),
    ]);

    const response = await request(app)
      .get('/api/v1/completed-works')
      .expect(200);

    const returnedCompletedWorks = response.body.data as CompletedWorkDto[];

    expect(returnedCompletedWorks).toHaveLength(1);
    expect(
      returnedCompletedWorks.map((completedWork) => completedWork.slug),
    ).toEqual(['active-completed-work']);
    expect(
      returnedCompletedWorks.every((completedWork) => completedWork.isActive),
    ).toBe(true);
  });

  it('returns completed works sorted by sortOrder in ascending order', async () => {
    const app = createApp();

    await CompletedWorksCollection.insertMany([
      createCompletedWorkFixture({
        slug: 'bmw-5-series-front-suspension',
        category: {
          slug: 'chassis',
        },
        sortOrder: 3,
      }),
      createCompletedWorkFixture({
        slug: 'audi-a4-engine-oil-leak',
        sortOrder: 1,
      }),
      createCompletedWorkFixture({
        slug: 'volkswagen-passat-brake-system',
        category: {
          slug: 'brakes',
        },
        sortOrder: 2,
      }),
    ]);

    const response = await request(app)
      .get('/api/v1/completed-works')
      .expect(200);
    const returnedCompletedWorks = response.body.data as CompletedWorkDto[];

    expect(
      returnedCompletedWorks.map((completedWork) => completedWork.sortOrder),
    ).toEqual([1, 2, 3]);
    expect(
      returnedCompletedWorks.map((completedWork) => completedWork.slug),
    ).toEqual([
      'audi-a4-engine-oil-leak',
      'volkswagen-passat-brake-system',
      'bmw-5-series-front-suspension',
    ]);
  });
});

describe('GET /api/v1/completed-works/:completedWorkId', () => {
  it('returns an active completedWork by id', async () => {
    const app = createApp();

    const createdCompletedWork = await CompletedWorksCollection.create(
      createCompletedWorkFixture({
        slug: 'audi-a4-engine-oil-leak',
        category: {
          slug: 'engine',
        },
        sortOrder: 1,
      }),
    );

    const completedWorkId = createdCompletedWork._id.toString();

    const response = await request(app)
      .get(`/api/v1/completed-works/${completedWorkId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      status: 200,
      success: true,
      message: `Successfully found completed work with id ${completedWorkId}`,
    });

    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: completedWorkId,
        slug: 'audi-a4-engine-oil-leak',
        car: {
          make: 'audi',
          model: 'A4',
          year: 2019,
        },
        category: {
          slug: 'engine',
        },
        translations: expect.objectContaining({
          uk: expect.objectContaining({
            customerRequest: expect.any(String),
            diagnosis: expect.any(String),
            performedWork: expect.arrayContaining([expect.any(String)]),
            result: expect.any(String),
          }),
          en: expect.objectContaining({
            customerRequest: expect.any(String),
            diagnosis: expect.any(String),
            performedWork: expect.arrayContaining([expect.any(String)]),
            result: expect.any(String),
          }),
          pl: expect.objectContaining({
            customerRequest: expect.any(String),
            diagnosis: expect.any(String),
            performedWork: expect.arrayContaining([expect.any(String)]),
            result: expect.any(String),
          }),
        }),
        images: expect.objectContaining({
          before: expect.arrayContaining([expect.any(String)]),
          after: expect.arrayContaining([expect.any(String)]),
        }),
        featured: true,
        sortOrder: 1,
        isActive: true,
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

  it('returns 400 when completedWorkId format is invalid', async () => {
    const app = createApp();

    const invalidCompletedWorkId = 'Invalid completedWorkId!';
    const encodedCompletedWorkId = encodeURIComponent(invalidCompletedWorkId);

    const response = await request(app)
      .get(`/api/v1/completed-works/${encodedCompletedWorkId}`)
      .expect(400);

    expect(response.body).toMatchObject({
      status: 400,
      success: false,
      code: 'HTTP_400',
    });
  });

  it('returns 404 when the completed-work does not exist', async () => {
    const app = createApp();

    const nonExistingCompletedWorkId = '6a8358cac0600f84ebc9a385';

    const response = await request(app)
      .get(`/api/v1/completed-works/${nonExistingCompletedWorkId}`)
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      success: false,
      message: 'Completed work not found.',
      code: 'COMPLETED_WORK_NOT_FOUND',
    });
  });

  it('returns 404 when the completed-work exists but is inactive', async () => {
    const app = createApp();

    const createdCompletedWork = await CompletedWorksCollection.create(
      createCompletedWorkFixture({
        slug: 'hidden-completed-work',
        sortOrder: 1,
        isActive: false,
      }),
    );

    const completedWorkId = createdCompletedWork._id.toString();

    const response = await request(app)
      .get(`/api/v1/completed-works/${completedWorkId}`)
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      success: false,
      message: 'Completed work not found.',
      code: 'COMPLETED_WORK_NOT_FOUND',
    });
  });
});
