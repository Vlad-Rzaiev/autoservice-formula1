import type { CreateServiceInput } from '@autoservice/contracts';

export function createServicePayloadFixture(
  overrides: Partial<CreateServiceInput> = {},
): CreateServiceInput {
  const defaultPayload: CreateServiceInput = {
    slug: 'diagnostics',
    specializationIds: ['68a800000000000000000006'],
    workDirectionIds: [
      '68a810000000000000000001',
      '68a81000000000000000000a',
      '68a81000000000000000000b',
    ],
    category: 'diagnostics',
    iconKey: 'scan-search',
    featured: true,
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
    ...defaultPayload,
    ...overrides,
    translations: {
      ...defaultPayload.translations,
      ...overrides.translations,
    },
  };
}
