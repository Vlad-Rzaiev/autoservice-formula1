export {
  default as MarketingNavigation,
  type MarketingNavigationProps,
} from './components/nav/marketing-navigation';
export { navItems } from './components/nav/navItems';
export {
  navigationVariants,
  navigationListVariants,
  navigationItemVariants,
  navigationLinkVariants,
  type NavigationVariantProps,
  type NavigationVariant,
} from './components/nav/navigation-link-variants';

export { default as MarketingFooter } from './components/footer/marketing-footer';

export { default as MarketingMobileMenu } from './components/mobile-menu/marketing-mobile-menu';
export { default as MobileMenuTrigger } from './components/mobile-menu/mobile-menu-trigger';
export { default as MobileMenuContactCard } from './components/mobile-menu/mobile-menu-contact-card';
export { default as MobileMenuActions } from './components/mobile-menu/mobile-menu-actions';
export { default as MobileMenuPreferences } from './components/mobile-menu/mobile-menu-preferences';
export { default as MobileMenuHeader } from './components/mobile-menu/mobile-menu-header';

export { default as MarketingHeader } from './components/header/marketing-header';

export { default as MarketingHero } from './components/hero/marketing-hero';

export { cardsItems, type CardItems } from './components/whyUs/cardsItems';

export { default as MarketingWhyUs } from './components/whyUs/marketing-whyUs';
export { default as MarketingBooking } from './components/marketing-booking';
export { default as MarketingCompletedWorks } from './components/marketing-completed-works';
export { default as MarketingContacts } from './components/marketing-contacts';
export { default as MarketingDiagnostics } from './components/diagnostics/marketing-diagnostics';
export { default as MarketingRepairProcess } from './components/marketing-repair-process';
export { default as MarketingReviews } from './components/marketing-reviews';
export { default as MarketingServices } from './components/marketing-services';
export { default as MarketingMechanics } from './components/marketing-mechanics';
export { default as MarketingWarranty } from './components/marketing-warranty';
export { default as MechanicsCatalogContainer } from './mechanics/components/mechanics-catalog-container';
export { default as MechanicsHero } from './mechanics/components/mechanics-hero';
export { default as ServiceCta } from './services/components/service-cta';
export { default as MechanicContainer } from './mechanics/components/mechanic-container';

export { createMechanicsMetadata } from './mechanics/server/create-mechanics-metadata';
export { createMechanicMetadata } from './mechanics/server/create-mechanic-metadata';

export { getMechanicOr404 } from './mechanics/server/get-mechanic-or-404';

export {
  mechanicsQueryKeys,
  mechanicsQueryOptions,
  mechanicByIdQueryOptions,
} from './mechanics/api/mechanics-query-options';

export {
  useMechanics,
  useFeaturesMechanics,
  useMechanicById,
} from './mechanics/api/use-mechanics';
