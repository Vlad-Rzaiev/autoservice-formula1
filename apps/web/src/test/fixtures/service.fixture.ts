import { ServiceDto } from '@autoservice/contracts';

export const createServiceFixture = (
  overrides: Partial<ServiceDto> = {},
): ServiceDto => ({
  _id: '66a8f377ad1babc123456789',
  slug: 'diagnostics',
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
