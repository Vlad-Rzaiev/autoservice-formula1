export const supportedLocales = ['uk', 'en', 'pl'] as const;

export type AppLocale = (typeof supportedLocales)[number];

export type ServiceLocale = AppLocale;

export function isSupportedLocale(locale: string): locale is AppLocale {
  return (supportedLocales as readonly string[]).includes(locale);
}
