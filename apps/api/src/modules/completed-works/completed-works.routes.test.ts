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
});
