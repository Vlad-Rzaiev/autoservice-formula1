import { ServiceDto } from '@autoservice/contracts';

export const createServiceFixture = (
  overrides: Partial<ServiceDto> = {},
): ServiceDto => ({
  _id: '66a8f377ad1babc123456789',
  slug: 'diagnostics',
  specializationIds: ['68a800000000000000000006'],
  workDirectionIds: [
    '68a810000000000000000001',
    '68a81000000000000000000a',
    '68a81000000000000000000b',
  ],
  category: 'diagnostics',
  iconKey: 'scan-search',
  featured: false,
  sortOrder: 1,
  isActive: true,
  translations: {
    uk: {
      title: 'Діагностика',
      description: 'Опис діагностики',
    },
    en: {
      title: 'Diagnostics',
      description: 'Diagnostics description',
    },
    pl: {
      title: 'Diagnostyka',
      description: 'Opis diagnostyki',
    },
  },
  createdAt: '2026-08-11T10:00:00.000Z',
  updatedAt: '2026-08-11T10:00:00.000Z',

  ...overrides,
});
