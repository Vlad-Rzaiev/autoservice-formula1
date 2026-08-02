import type { ServiceDto, ServiceTranslationDto } from '@autoservice/contracts';

import type {
  ServiceLeanDocument,
  ServiceTranslationPersistence,
} from './service.model.js';

function toServiceTranslationDto(
  translation: ServiceTranslationPersistence,
): ServiceTranslationDto {
  return {
    title: translation.title,
    description: translation.description,
  };
}

export function toServiceDto(
  serviceLeanDocument: ServiceLeanDocument,
): ServiceDto {
  return {
    _id: serviceLeanDocument._id.toString(),
    slug: serviceLeanDocument.slug,
    category: serviceLeanDocument.category,
    iconKey: serviceLeanDocument.iconKey,
    featured: serviceLeanDocument.featured,
    sortOrder: serviceLeanDocument.sortOrder,
    isActive: serviceLeanDocument.isActive,
    translations: {
      uk: toServiceTranslationDto(serviceLeanDocument.translations.uk),
      en: toServiceTranslationDto(serviceLeanDocument.translations.en),
      pl: toServiceTranslationDto(serviceLeanDocument.translations.pl),
    },
  };
}
