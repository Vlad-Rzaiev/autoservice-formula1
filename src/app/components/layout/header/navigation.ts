export const navItems = [
  { href: "/#features", translationKey: "mobile-menu.navigation.features" },
  { href: "/#workflow", translationKey: "mobile-menu.navigation.workflow" },
  { href: "/#roles", translationKey: "mobile-menu.navigation.roles" },
  { href: "/#faq", translationKey: "mobile-menu.navigation.faq" },
] as const;

export type NavigationItems = (typeof navItems)[number];
