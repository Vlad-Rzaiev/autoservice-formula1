export const translationModules = [
  "auth",
  "booking",
  "clients",
  "dashboard",
  "marketing",
  "metadata",
  "mobile-menu",
  "services",
] as const;

export type TranslationModule = (typeof translationModules)[number];
