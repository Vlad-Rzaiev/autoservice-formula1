import { AppLocale } from '../common/locale.js';
import { SpecializationDto } from '../specializations/specialization.dto.js';
import { WorkDirectionDto } from '../work-directions/work-direction.dto.js';

export interface MechanicNameDto {
  firstName: string;
  lastName: string;
}

export interface MechanicTranslationDto {
  description: string;
}

export interface MechanicCertificateDto {
  name: string;
  title: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string | null;
  certificateNumber: string;
}

export interface MechanicDto {
  _id: string;
  name: Record<AppLocale, MechanicNameDto>;
  photo: {
    url: string | null;
  };
  specializations: SpecializationDto[];
  workDirections: WorkDirectionDto[];
  translations: Record<AppLocale, MechanicTranslationDto>;
  experienceYears: number;
  certificates: MechanicCertificateDto[];
  featured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
