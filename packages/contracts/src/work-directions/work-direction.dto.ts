import { AppLocale } from '../common/locale.js';

export interface WorkDirectionTranslationDto {
  title: string;
}

export interface WorkDirectionDto {
  _id: string;
  slug: string;
  translations: Record<AppLocale, WorkDirectionTranslationDto>;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
