import { Types } from 'mongoose';
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
    specializationIds: [new Types.ObjectId('68a800000000000000000006')],
    workDirectionIds: [
      new Types.ObjectId('68a810000000000000000001'),
      new Types.ObjectId('68a81000000000000000000a'),
      new Types.ObjectId('68a81000000000000000000b'),
    ],
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
