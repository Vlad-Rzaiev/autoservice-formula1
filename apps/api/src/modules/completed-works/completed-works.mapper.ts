import {
  CompletedWorkDto,
  CompletedWorkTranslationDto,
} from '@autoservice/contracts';
import {
  CompletedWorksLeanDocument,
  CompletedWorksTranslationPersistence,
} from './completed-works.model.js';

function toCompletedWorkTranslationDto(
  translation: CompletedWorksTranslationPersistence,
): CompletedWorkTranslationDto {
  return {
    customerRequest: translation.customerRequest,
    diagnosis: translation.diagnosis,
    performedWork: translation.performedWork,
    result: translation.result,
  };
}

export function toCompletedWorkDto(
  completedLeanDocument: CompletedWorksLeanDocument,
): CompletedWorkDto {
  return {
    _id: completedLeanDocument._id.toString(),
    slug: completedLeanDocument.slug,
    car: {
      make: completedLeanDocument.car.make,
      model: completedLeanDocument.car.model,
      year: completedLeanDocument.car.year,
    },
    category: {
      slug: completedLeanDocument.category.slug,
    },
    translations: {
      uk: toCompletedWorkTranslationDto(completedLeanDocument.translations.uk),
      en: toCompletedWorkTranslationDto(completedLeanDocument.translations.en),
      pl: toCompletedWorkTranslationDto(completedLeanDocument.translations.pl),
    },
    images: {
      before: completedLeanDocument.images.before,
      after: completedLeanDocument.images.after,
    },
    featured: completedLeanDocument.featured,
    sortOrder: completedLeanDocument.sortOrder,
    isActive: completedLeanDocument.isActive,
    createdAt: completedLeanDocument.createdAt.toISOString(),
    updatedAt: completedLeanDocument.updatedAt.toISOString(),
  };
}
