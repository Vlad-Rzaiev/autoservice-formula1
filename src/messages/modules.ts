export const translationModules = [
  "auth",
  "clients",
  "dashboard",
  "marketing",
  "metadata",
  "mobile-menu",
] as const;

export type TranslationModule = (typeof translationModules)[number];
