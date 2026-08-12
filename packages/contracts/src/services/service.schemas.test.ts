import { describe, expect, it } from 'vitest';
import { ServiceDto } from './service.dto.js';
import {
  createServiceSchema,
  serviceDtoSchema,
  serviceSlugSchema,
} from './service.schemas.js';

const validServiceDto: ServiceDto = {
  _id: '66a8f377ad1babc123456789',
  slug: 'engine-diagnostics',
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

const validCreateServicePayload = {
  slug: 'engine-diagnostics',
  category: 'diagnostics',
  iconKey: 'scan-search',
  featured: true,
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
};

describe('serviceSlugSchema', () => {
  it('accepts a valid slug', () => {
    const result = serviceSlugSchema.safeParse('engine-diagnostics');

    expect(result.success).toBe(true);
  });

  it('rejects a slug with uppercase letters', () => {
    const result = serviceSlugSchema.safeParse('Engine-Diagnostics');

    expect(result.success).toBe(false);
  });

  it('rejects a slug containing spaces', () => {
    const result = serviceSlugSchema.safeParse('engine diagnostics');

    expect(result.success).toBe(false);
  });

  it('rejects consecutive hyphens', () => {
    const result = serviceSlugSchema.safeParse('engine--diagnostics');

    expect(result.success).toBe(false);
  });

  it('rejects a slug longer than 50 characters', () => {
    const invalidSlug = 'a'.repeat(51);

    const result = serviceSlugSchema.safeParse(invalidSlug);

    expect(result.success).toBe(false);
  });
});

describe('serviceDtoSchema', () => {
  it('accepts a valid service DTO', () => {
    const result = serviceDtoSchema.safeParse(validServiceDto);

    expect(result.success).toBe(true);
  });

  it('rejects an unsupported category', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      category: 'spaceship-repair',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an unsupported icon key', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      iconKey: 'unknown-icon',
    });

    expect(result.success).toBe(false);
  });

  it('rejects zero sortOrder', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      sortOrder: 0,
    });

    expect(result.success).toBe(false);
  });

  it('rejects a negative sortOrder', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      sortOrder: -1,
    });

    expect(result.success).toBe(false);
  });

  it('rejects a decimal sortOrder', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      sortOrder: 1.5,
    });

    expect(result.success).toBe(false);
  });

  it('rejects a service without Polish translation', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      translations: {
        uk: validServiceDto.translations.uk,
        en: validServiceDto.translations.en,
      },
    });

    expect(result.success).toBe(false);
  });

  it('rejects an empty translation title', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      translations: {
        ...validServiceDto.translations,
        uk: {
          ...validServiceDto.translations.uk,
          title: '',
        },
      },
    });

    expect(result.success).toBe(false);
  });

  it('rejects a translation title containing only whitespace', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      translations: {
        ...validServiceDto.translations,
        uk: {
          ...validServiceDto.translations.uk,
          title: '   ',
        },
      },
    });

    expect(result.success).toBe(false);
  });

  it('rejects an invalid createdAt datetime', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      createdAt: '10.08.2026',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an invalid updatedAt datetime', () => {
    const result = serviceDtoSchema.safeParse({
      ...validServiceDto,
      updatedAt: 'invalid-date',
    });

    expect(result.success).toBe(false);
  });
});

describe('createServiceSchema', () => {
  it('accepts a valid create service payload', () => {
    const result = createServiceSchema.safeParse(validCreateServicePayload);

    expect(result.success).toBe(true);
  });

  it('sets featured to false when it is omitted', () => {
    const { featured: _featured, ...payloadWithoutFeatured } =
      validCreateServicePayload;

    const result = createServiceSchema.safeParse(payloadWithoutFeatured);

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    expect(result.data.featured).toBe(false);
  });

  it('sets isActive to true when it is omitted', () => {
    const { isActive: _isActive, ...payloadWithoutIsActive } =
      validCreateServicePayload;

    const result = createServiceSchema.safeParse(payloadWithoutIsActive);

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    expect(result.data.isActive).toBe(true);
  });

  it('preserves explicitly provided boolean values', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      featured: true,
      isActive: false,
    });

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    expect(result.data.featured).toBe(true);
    expect(result.data.isActive).toBe(false);
  });

  it('rejects an invalid slug', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      slug: 'Engine Diagnostics',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an unsupported category', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      category: 'spaceship-repair',
    });

    expect(result.success).toBe(false);
  });

  it('rejects an unsupported icon key', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      iconKey: 'unknown-icon',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a payload without Polish translation', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      translations: {
        uk: validCreateServicePayload.translations.uk,
        en: validCreateServicePayload.translations.en,
      },
    });

    expect(result.success).toBe(false);
  });

  it('rejects _id provided by the client', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      _id: 'client-provided-id',
    });

    expect(result.success).toBe(false);
  });

  it('rejects sortOrder provided by the client', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      sortOrder: 999,
    });

    expect(result.success).toBe(false);
  });

  it('rejects createdAt provided by the client', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      createdAt: '2026-08-10T10:00:00.000Z',
    });

    expect(result.success).toBe(false);
  });

  it('rejects updatedAt provided by the client', () => {
    const result = createServiceSchema.safeParse({
      ...validCreateServicePayload,
      updatedAt: '2026-08-10T10:00:00.000Z',
    });

    expect(result.success).toBe(false);
  });
});
