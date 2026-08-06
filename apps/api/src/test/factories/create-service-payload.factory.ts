import type { CreateServiceInput } from '@autoservice/contracts';

export function createServicePayloadFixture(
  overrides: Partial<CreateServiceInput> = {},
): CreateServiceInput {
  const defaultPayload: CreateServiceInput = {
    slug: 'diagnostics',
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
