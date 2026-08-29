import {
  WorkDirectionDto,
  WorkDirectionTranslationDto,
} from '@autoservice/contracts';
import {
  WorkDirectionLeanDocument,
  WorkDirectionTranslationPersistence,
} from './work-direction.model.js';

function toWorkDirectionTranslationDto(
  translation: WorkDirectionTranslationPersistence,
): WorkDirectionTranslationDto {
  return {
    title: translation.title,
  };
}

export function toWorkDirectionDto(
  workDirectionLeanDocument: WorkDirectionLeanDocument,
): WorkDirectionDto {
  return {
    _id: workDirectionLeanDocument._id.toString(),
    slug: workDirectionLeanDocument.slug,
    translations: {
      uk: toWorkDirectionTranslationDto(
        workDirectionLeanDocument.translations.uk,
      ),
      en: toWorkDirectionTranslationDto(
        workDirectionLeanDocument.translations.en,
      ),
      pl: toWorkDirectionTranslationDto(
        workDirectionLeanDocument.translations.pl,
      ),
    },
    isActive: workDirectionLeanDocument.isActive,
    sortOrder: workDirectionLeanDocument.sortOrder,
    createdAt: workDirectionLeanDocument.createdAt.toISOString(),
    updatedAt: workDirectionLeanDocument.updatedAt.toISOString(),
  };
}
