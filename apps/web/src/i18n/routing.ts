import { defineRouting } from 'next-intl/routing';
import { appLocales, defaultLocale } from '@/i18n/locale-config';

export const routing = defineRouting({
  locales: appLocales,
  defaultLocale,
});
