export {
  useServices,
  useFeaturedServices,
  useServiceBySlug,
} from './api/use-services';

export { getServices } from './api/get-services';
export { getServiceBySlug } from './api/get-service-by-slug';
export {
  servicesQueryKeys,
  servicesQueryOptions,
  serviceBySlugQueryOptions,
} from './api/services-query-options';

export {
  selectActiveServices,
  selectFeaturedServices,
} from './model/service.selectors';

export {
  benefits,
  type BenefitItem,
  type BenefitTranslationKey,
} from './lib/service-benefit-items';

export {
  benefitListVariants,
  benefitItemVariants,
  benefitIconVariants,
  benefitTextVariants,
  benefitFontAwesomeIconVariants,
} from './lib/benefit-list-variants';

export { serviceIconMap, defaultServiceIcon } from './lib/service-icon-map';

export {
  default as BenefitList,
  type BenefitListProps,
} from './components/benefit-list';
export {
  default as ServiceCard,
  type ServiceCardProps,
} from './components/service-card';
export { default as ServiceDetails } from './components/service-details';
export { default as ServicesCatalogContainer } from './components/services-catalog-container';
export { default as ServicesCatalog } from './components/services-catalog';
export { default as ServicesCta } from './components/services-cta';
export { default as ServicesHero } from './components/services-hero';

export { createServiceMetadata } from './server/create-service-metadata';
export { createServicesMetadata } from './server/create-services-metadata';

export { getServiceOr404 } from './server/get-service-or-404';
