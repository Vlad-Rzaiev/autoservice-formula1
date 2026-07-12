export const translationModules = [
  "auth",
  "clients",
  "dashboard",
  "marketing",
  "metadata",
] as const;

export type TranslationModule = (typeof translationModules)[number];
