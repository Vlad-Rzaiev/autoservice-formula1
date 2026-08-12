import { describe, expect, it } from 'vitest';
import {
  selectActiveServices,
  selectFeaturedServices,
} from './service.selectors';
import { createServiceFixture } from '@/test/fixtures/service.fixture';

describe('selectActiveServices', () => {
  it('returns only active services', () => {
    const services = selectActiveServices([
      createServiceFixture({
        _id: '1',
        slug: 'active-service',
        isActive: true,
        sortOrder: 1,
      }),
      createServiceFixture({
        _id: '2',
        slug: 'inactive-service',
        isActive: false,
        sortOrder: 2,
      }),
    ]);

    expect(services.map((service) => service.slug)).toEqual(['active-service']);
  });

  it('sorts active services by sortOrder in ascending order', () => {
    const services = selectActiveServices([
      createServiceFixture({
        _id: '3',
        slug: 'third-service',
        sortOrder: 3,
      }),
      createServiceFixture({
        _id: '1',
        slug: 'first-service',
        sortOrder: 1,
      }),
      createServiceFixture({
        _id: '2',
        slug: 'second-service',
        sortOrder: 2,
      }),
    ]);

    expect(services.map((service) => service.slug)).toEqual([
      'first-service',
      'second-service',
      'third-service',
    ]);
  });

  it('returns an empty array when services are empty', () => {
    const emptyServices = selectActiveServices([]);

    expect(emptyServices).toEqual([]);
  });
});

describe('selectFeaturedServices', () => {
  it('returns only active featured services', () => {
    const services = selectFeaturedServices([
      createServiceFixture({
        _id: '1',
        slug: 'featured-active',
        featured: true,
        isActive: true,
        sortOrder: 1,
      }),
      createServiceFixture({
        _id: '2',
        slug: 'featured-inactive',
        featured: true,
        isActive: false,
        sortOrder: 2,
      }),
      createServiceFixture({
        _id: '3',
        slug: 'active-not-featured',
        featured: false,
        isActive: true,
        sortOrder: 3,
      }),
    ]);

    expect(services.map((service) => service.slug)).toEqual([
      'featured-active',
    ]);
  });

  it('sorts featured services by sortOrder in ascending order', () => {
    const services = selectFeaturedServices([
      createServiceFixture({
        _id: '3',
        slug: 'third-featured',
        featured: true,
        sortOrder: 3,
      }),
      createServiceFixture({
        _id: '1',
        slug: 'first-featured',
        featured: true,
        sortOrder: 1,
      }),
      createServiceFixture({
        _id: '2',
        slug: 'second-featured',
        featured: true,
        sortOrder: 2,
      }),
    ]);

    expect(services.map((service) => service.slug)).toEqual([
      'first-featured',
      'second-featured',
      'third-featured',
    ]);
  });
});
