import type { AppLocale } from '@/i18n/locale-config';

export function formatDate(date: string, locale: AppLocale): string {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}
