import {
  MechanicNameDto,
  MechanicTranslationDto,
  MechanicCertificateDto,
  MechanicDto,
} from '@autoservice/contracts';

import {
  MechanicNamePersistence,
  MechanicTranslationsPersistence,
  MechanicCertificatesPersistence,
  MechanicWithRelationsLeanDocument,
} from './mechanic.model.js';
import { toSpecializationDto } from '../specializations/specialization.mapper.js';
import { toWorkDirectionDto } from '../work-directions/work-direction.mapper.js';

function toMechanicNameDto(
  mechanicName: MechanicNamePersistence,
): MechanicNameDto {
  return {
    firstName: mechanicName.firstName,
    lastName: mechanicName.lastName,
  };
}

function toMechanicTranslationDto(
  mechanicTranslation: MechanicTranslationsPersistence,
): MechanicTranslationDto {
  return {
    description: mechanicTranslation.description,
  };
}

function toMechanicCertificateDto(
  mechanicCertificate: MechanicCertificatesPersistence,
): MechanicCertificateDto {
  return {
    name: mechanicCertificate.name,
    title: mechanicCertificate.title,
    issuer: mechanicCertificate.issuer,
    issuedAt: mechanicCertificate.issuedAt,
    expiresAt: mechanicCertificate.expiresAt,
    certificateNumber: mechanicCertificate.certificateNumber,
  };
}

export function toMechanicDto(
  mechanicLeanDocument: MechanicWithRelationsLeanDocument,
): MechanicDto {
  return {
    _id: mechanicLeanDocument._id.toString(),
    name: {
      uk: toMechanicNameDto(mechanicLeanDocument.name.uk),
      en: toMechanicNameDto(mechanicLeanDocument.name.en),
      pl: toMechanicNameDto(mechanicLeanDocument.name.pl),
    },
    photo: {
      url: mechanicLeanDocument.photo.url,
    },
    specializations:
      mechanicLeanDocument.specializations.map(toSpecializationDto),
    workDirections: mechanicLeanDocument.workDirections.map(toWorkDirectionDto),
    translations: {
      uk: toMechanicTranslationDto(mechanicLeanDocument.translations.uk),
      en: toMechanicTranslationDto(mechanicLeanDocument.translations.en),
      pl: toMechanicTranslationDto(mechanicLeanDocument.translations.pl),
    },
    experienceYears: mechanicLeanDocument.experienceYears,
    certificates: mechanicLeanDocument.certificates.map(
      toMechanicCertificateDto,
    ),
    featured: mechanicLeanDocument.featured,
    isActive: mechanicLeanDocument.isActive,
    sortOrder: mechanicLeanDocument.sortOrder,
    createdAt: mechanicLeanDocument.createdAt.toISOString(),
    updatedAt: mechanicLeanDocument.updatedAt.toISOString(),
  };
}
