export const translationModules = [
  "auth",
  "clients",
  "dashboard",
  "marketing",
] as const;

export type TranslationModule = (typeof translationModules)[number];
