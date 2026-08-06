import type { ServicePersistence } from '../../modules/services/service.model.js';

type ServiceFixtureOverrides = Partial<
  Omit<ServicePersistence, 'translations'>
> & {
  translations?: Partial<ServicePersistence['translations']>;
};

export function createServiceFixture(
  overrides: ServiceFixtureOverrides = {},
): ServicePersistence {
  const defaultService: ServicePersistence = {
    slug: 'diagnostics',
    category: 'diagnostics',
    iconKey: 'scan-search',
    featured: true,
    sortOrder: 3,
    isActive: true,
    translations: {
      uk: {
        title: 'Діагностика',
        description: 'Комплексна діагностика автомобіля.',
      },
      en: {
        title: 'Diagnostics',
        description: 'Comprehensive vehicle diagnostics.',
      },
      pl: {
        title: 'Diagnostyka',
        description: 'Kompleksowa diagnostyka samochodu.',
      },
    },
  };

  return {
    ...defaultService,
    ...overrides,
    translations: {
      ...defaultService.translations,
      ...overrides.translations,
    },
  };
}
