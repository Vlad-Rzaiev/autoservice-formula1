import type { ServiceLocale } from "../common/locale.js";
import type { ServiceCategory, ServiceIconKey } from "./service.constants.js";

export interface ServiceTranslationDto {
  title: string;
  description: string;
}

export interface ServiceDto {
  _id: string;
  slug: string;
  category: ServiceCategory;
  iconKey: ServiceIconKey;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  translations: Record<ServiceLocale, ServiceTranslationDto>;
  createdAt: string;
  updatedAt: string;
}
