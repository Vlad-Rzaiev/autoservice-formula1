import { AppLocale } from '../common/locale.js';
import type { CompletedWorksCategorySlug } from './completed-works.constants.js';

export interface CompletedWorkCarDto {
  make: string;
  model: string;
  year: number;
}

export interface CompletedWorkTranslationDto {
  customerRequest: string;
  diagnosis: string;
  performedWork: string[];
  result: string;
}

export interface CompletedWorkImagesDto {
  before: string[];
  after: string[];
}

export interface CompletedWorkDto {
  _id: string;
  slug: string;
  car: CompletedWorkCarDto;
  category: {
    slug: CompletedWorksCategorySlug;
  };
  translations: Record<AppLocale, CompletedWorkTranslationDto>;
  images: CompletedWorkImagesDto;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
