export const translationModules = [
  'auth',
  'booking',
  'clients',
  'dashboard',
  'marketing',
  'metadata',
  'mobile-menu',
  'services',
  'specialists',
] as const;

export type TranslationModule = (typeof translationModules)[number];

export const clientMessageModules = {
  marketing: [
    'auth',
    'booking',
    'marketing',
    'mobile-menu',
    'services',
    'specialists',
  ],

  auth: ['auth'],

  dashboard: ['dashboard', 'clients'],
} as const satisfies Record<string, readonly TranslationModule[]>;
