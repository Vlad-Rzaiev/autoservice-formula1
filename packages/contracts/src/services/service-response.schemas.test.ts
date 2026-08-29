import { describe, expect, it } from 'vitest';

import {
  serviceResponseSchema,
  servicesResponseSchema,
} from './service-response.schemas.js';

const validServiceDto = {
  _id: '66a8f377ad1babc123456789',
  slug: 'engine-diagnostics',
  specializationIds: [
    {
      _id: '68a800000000000000000006',
      slug: 'diagnostics',
      translations: {
        uk: {
          title: "Комп'ютерна діагностика",
          description:
            "Комплексна комп'ютерна діагностика електронних систем та пошук несправностей.",
        },
        en: {
          title: 'Computer Diagnostics',
          description:
            'Comprehensive computer diagnostics of electronic systems and fault detection.',
        },
        pl: {
          title: 'Diagnostyka komputerowa',
          description:
            'Kompleksowa diagnostyka komputerowa układów elektronicznych i wykrywanie usterek.',
        },
      },
      isActive: true,
      sortOrder: 6,
      createdAt: '2026-08-22T10:00:00.000Z',
      updatedAt: '2026-08-22T10:00:00.000Z',
    },
  ],
  workDirectionIds: [
    {
      _id: '68a810000000000000000001',
      slug: 'engine-diagnostics',
      translations: {
        uk: {
          title: 'Діагностика двигуна',
        },
        en: {
          title: 'Engine Diagnostics',
        },
        pl: {
          title: 'Diagnostyka silnika',
        },
      },
      isActive: true,
      sortOrder: 1,
      createdAt: '2026-08-22T10:00:00.000Z',
      updatedAt: '2026-08-22T10:00:00.000Z',
    },
    {
      _id: '68a81000000000000000000a',
      slug: 'computer-diagnostics',
      translations: {
        uk: {
          title: "Комп'ютерна діагностика",
        },
        en: {
          title: 'Computer Diagnostics',
        },
        pl: {
          title: 'Diagnostyka komputerowa',
        },
      },
      isActive: true,
      sortOrder: 10,
      createdAt: '2026-08-22T10:00:00.000Z',
      updatedAt: '2026-08-22T10:00:00.000Z',
    },
    {
      _id: '68a81000000000000000000b',
      slug: 'auto-electrics',
      translations: {
        uk: {
          title: 'Автоелектрика',
        },
        en: {
          title: 'Auto Electrics',
        },
        pl: {
          title: 'Elektryka samochodowa',
        },
      },
      isActive: true,
      sortOrder: 11,
      createdAt: '2026-08-22T10:00:00.000Z',
      updatedAt: '2026-08-22T10:00:00.000Z',
    },
  ],
  category: 'diagnostics',
  iconKey: 'scan-search',
  featured: true,
  sortOrder: 1,
  isActive: true,
  translations: {
    uk: {
      title: 'Діагностика двигуна',
      description: 'Комплексна діагностика двигуна.',
    },
    en: {
      title: 'Engine diagnostics',
      description: 'Comprehensive engine diagnostics.',
    },
    pl: {
      title: 'Diagnostyka silnika',
      description: 'Kompleksowa diagnostyka silnika.',
    },
  },
  createdAt: '2026-08-10T10:00:00.000Z',
  updatedAt: '2026-08-10T10:00:00.000Z',
};

describe('serviceResponseSchema', () => {
  it('accepts a valid service response', () => {
    const result = serviceResponseSchema.safeParse({
      status: 200,
      success: true,
      message: 'Successfully found service.',
      data: validServiceDto,
    });

    expect(result.success).toBe(true);
  });

  it('rejects a response with success false', () => {
    const result = serviceResponseSchema.safeParse({
      status: 200,
      success: false,
      message: 'Successfully found service.',
      data: validServiceDto,
    });

    expect(result.success).toBe(false);
  });

  it('rejects status provided as a string', () => {
    const result = serviceResponseSchema.safeParse({
      status: '200',
      success: true,
      message: 'Successfully found service.',
      data: validServiceDto,
    });

    expect(result.success).toBe(false);
  });

  it('rejects a decimal status', () => {
    const result = serviceResponseSchema.safeParse({
      status: 200.5,
      success: true,
      message: 'Successfully found service.',
      data: validServiceDto,
    });

    expect(result.success).toBe(false);
  });

  it('rejects a response containing an invalid service DTO', () => {
    const result = serviceResponseSchema.safeParse({
      status: 200,
      success: true,
      message: 'Successfully found service.',
      data: {
        ...validServiceDto,
        sortOrder: 0,
      },
    });

    expect(result.success).toBe(false);
  });

  it('rejects a response without data', () => {
    const result = serviceResponseSchema.safeParse({
      status: 200,
      success: true,
      message: 'Successfully found service.',
    });

    expect(result.success).toBe(false);
  });
});

describe('servicesResponseSchema', () => {
  it('accepts a valid services response', () => {
    const result = servicesResponseSchema.safeParse({
      status: 200,
      success: true,
      message: 'Successfully found services.',
      data: [validServiceDto],
    });

    expect(result.success).toBe(true);
  });

  it('accepts an empty services array', () => {
    const result = servicesResponseSchema.safeParse({
      status: 200,
      success: true,
      message: 'Successfully found services.',
      data: [],
    });

    expect(result.success).toBe(true);
  });

  it('rejects a single service object instead of an array', () => {
    const result = servicesResponseSchema.safeParse({
      status: 200,
      success: true,
      message: 'Successfully found services.',
      data: validServiceDto,
    });

    expect(result.success).toBe(false);
  });

  it('rejects the response when one service in the array is invalid', () => {
    const result = servicesResponseSchema.safeParse({
      status: 200,
      success: true,
      message: 'Successfully found services.',
      data: [
        validServiceDto,
        {
          ...validServiceDto,
          slug: 'Invalid Slug',
        },
      ],
    });

    expect(result.success).toBe(false);
  });
});
