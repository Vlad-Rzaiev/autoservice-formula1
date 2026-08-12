export const navItems = [
  {
    href: '/#services',
    translationKey: 'marketing.header.navigation.services',
  },
  {
    href: '/#specialists',
    translationKey: 'marketing.header.navigation.specialists',
  },
  {
    href: '/#completed-works',
    translationKey: 'marketing.header.navigation.completedWorks',
  },
  {
    href: '/#warranty',
    translationKey: 'marketing.header.navigation.warranty',
  },
  {
    href: '/#contacts',
    translationKey: 'marketing.header.navigation.contacts',
  },
] as const;

export type NavigationItems = (typeof navItems)[number];
