export const serviceLocales = ["uk", "en", "pl"] as const;

export type ServiceLocale = (typeof serviceLocales)[number];

export interface ServiceTranslation {
  title: string;
  description: string;
}

export interface Service {
  _id: string;
  slug: string;
  category: string;
  iconKey: string;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  translations: Record<ServiceLocale, ServiceTranslation>;
}

export interface ApiResponse<TData> {
  status: number;
  success: boolean;
  message: string;
  data: TData;
}

export type ServicesResponse = ApiResponse<Service[]>;
