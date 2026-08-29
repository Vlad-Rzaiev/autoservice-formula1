import {
  SpecializationDto,
  SpecializationTranslationDto,
} from '@autoservice/contracts';
import {
  SpecializationLeanDocument,
  SpecializationTranslationPersistence,
} from './specialization.model.js';

function toSpecializationTranslationDto(
  translation: SpecializationTranslationPersistence,
): SpecializationTranslationDto {
  return {
    title: translation.title,
    description: translation.description,
  };
}

export function toSpecializationDto(
  specializationLeanDocument: SpecializationLeanDocument,
): SpecializationDto {
  return {
    _id: specializationLeanDocument._id.toString(),
    slug: specializationLeanDocument.slug,
    translations: {
      uk: toSpecializationTranslationDto(
        specializationLeanDocument.translations.uk,
      ),
      en: toSpecializationTranslationDto(
        specializationLeanDocument.translations.en,
      ),
      pl: toSpecializationTranslationDto(
        specializationLeanDocument.translations.pl,
      ),
    },
    isActive: specializationLeanDocument.isActive,
    sortOrder: specializationLeanDocument.sortOrder,
    createdAt: specializationLeanDocument.createdAt.toISOString(),
    updatedAt: specializationLeanDocument.updatedAt.toISOString(),
  };
}
