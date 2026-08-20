export const completedWorksCategories = [
  {
    slug: 'chassis',
    translations: {
      uk: 'Ходова частина',
      en: 'Chassis',
      pl: 'Zawieszenie',
    },
  },
  {
    slug: 'engine',
    translations: {
      uk: 'Двигун',
      en: 'Engine',
      pl: 'Silnik',
    },
  },
  {
    slug: 'brakes',
    translations: {
      uk: 'Гальмівна система',
      en: 'Brake System',
      pl: 'Układ hamulcowy',
    },
  },
  {
    slug: 'transmission',
    translations: {
      uk: 'Трансмісія',
      en: 'Transmission',
      pl: 'Układ napędowy',
    },
  },
  {
    slug: 'auto-electrics',
    translations: {
      uk: 'Автоелектрика',
      en: 'Auto Electrics',
      pl: 'Elektryka samochodowa',
    },
  },
  {
    slug: 'diagnostics',
    translations: {
      uk: 'Діагностика',
      en: 'Diagnostics',
      pl: 'Diagnostyka',
    },
  },
  {
    slug: 'climate',
    translations: {
      uk: 'Система кондиціонування',
      en: 'Climate Control',
      pl: 'Klimatyzacja',
    },
  },
  {
    slug: 'maintenance',
    translations: {
      uk: 'Технічне обслуговування',
      en: 'Maintenance',
      pl: 'Serwis okresowy',
    },
  },
  {
    slug: 'body-repair',
    translations: {
      uk: 'Кузовний ремонт',
      en: 'Body Repair',
      pl: 'Naprawy blacharskie',
    },
  },
  {
    slug: 'tires-wheels',
    translations: {
      uk: 'Шини та колеса',
      en: 'Tires & Wheels',
      pl: 'Opony i koła',
    },
  },
] as const;

export const completedWorksCategoriesSlug = [
  'chassis',
  'engine',
  'brakes',
  'transmission',
  'auto-electrics',
  'diagnostics',
  'climate',
  'maintenance',
  'body-repair',
  'tires-wheels',
] as const;

export type CompletedWorksCategory = (typeof completedWorksCategories)[number];
export type CompletedWorksCategorySlug =
  (typeof completedWorksCategoriesSlug)[number];
