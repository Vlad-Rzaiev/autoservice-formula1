import type { ServiceDto, ServiceTranslationDto } from '@autoservice/contracts';

import type {
  ServicesWithRelationsLeanDocument,
  ServiceTranslationPersistence,
} from './service.model.js';
import { toSpecializationDto } from '../specializations/specialization.mapper.js';
import { toWorkDirectionDto } from '../work-directions/work-direction.mapper.js';

function toServiceTranslationDto(
  translation: ServiceTranslationPersistence,
): ServiceTranslationDto {
  return {
    title: translation.title,
    description: translation.description,
  };
}

export function toServiceDto(
  serviceLeanDocument: ServicesWithRelationsLeanDocument,
): ServiceDto {
  return {
    _id: serviceLeanDocument._id.toString(),
    slug: serviceLeanDocument.slug,
    specializationIds:
      serviceLeanDocument.specializationIds.map(toSpecializationDto),
    workDirectionIds:
      serviceLeanDocument.workDirectionIds.map(toWorkDirectionDto),
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
    createdAt: serviceLeanDocument.createdAt.toISOString(),
    updatedAt: serviceLeanDocument.updatedAt.toISOString(),
  };
}
