import { AppLocale } from '../common/locale.js';

export interface SpecializationTranslationDto {
  title: string;
  description: string;
}

export interface SpecializationsDto {
  _id: string;
  slug: string;
  translations: Record<AppLocale, SpecializationTranslationDto>;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
