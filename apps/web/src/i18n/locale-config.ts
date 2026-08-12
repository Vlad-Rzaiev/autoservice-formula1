import {
  isSupportedLocale,
  supportedLocales,
  type AppLocale,
} from '@autoservice/contracts';

export { type AppLocale };

export const appLocales = supportedLocales;

export const defaultLocale = 'pl' satisfies AppLocale;

export const isAppLocale = isSupportedLocale;

export interface LocaleOption {
  code: AppLocale;
  label: string;
  flag: string;
}

export const localeOptions = [
  {
    code: 'pl',
    label: 'PL',
    flag: 'pl.svg',
  },
  {
    code: 'en',
    label: 'EN',
    flag: 'gb.svg',
  },
  {
    code: 'uk',
    label: 'UA',
    flag: 'ua.svg',
  },
] as const satisfies readonly LocaleOption[];
