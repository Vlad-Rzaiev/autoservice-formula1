import type { ServiceDto, ServiceTranslationDto } from '@autoservice/contracts';

import type {
  ServiceDocument,
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

export function toServiceDto(serviceDocument: ServiceDocument): ServiceDto {
  return {
    _id: serviceDocument._id.toString(),
    slug: serviceDocument.slug,
    category: serviceDocument.category,
    iconKey: serviceDocument.iconKey,
    featured: serviceDocument.featured,
    sortOrder: serviceDocument.sortOrder,
    isActive: serviceDocument.isActive,
    translations: {
      uk: toServiceTranslationDto(serviceDocument.translations.uk),
      en: toServiceTranslationDto(serviceDocument.translations.en),
      pl: toServiceTranslationDto(serviceDocument.translations.pl),
    },
  };
}
