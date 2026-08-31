import { model, Schema, type Types } from 'mongoose';
import type { AppLocale } from '@autoservice/contracts';
import { SpecializationLeanDocument } from '../specializations/specialization.model.js';
import { WorkDirectionLeanDocument } from '../work-directions/work-direction.model.js';

export interface MechanicNamePersistence {
  firstName: string;
  lastName: string;
}

export interface MechanicTranslationsPersistence {
  description: string;
}

export interface MechanicCertificatesPersistence {
  name: string;
  title: string;
  issuer: string;
  issuedAt: string;
  expiresAt: string | null;
  certificateNumber: string;
}

export interface MechanicPersistence {
  name: Record<AppLocale, MechanicNamePersistence>;
  photo: {
    url: string | null;
  };
  specializations: Types.ObjectId[];
  workDirections: Types.ObjectId[];
  translations: Record<AppLocale, MechanicTranslationsPersistence>;
  experienceYears: number;
  certificates: MechanicCertificatesPersistence[];
  featured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export interface MechanicTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type MechanicDocumentData = MechanicPersistence & MechanicTimestamps;

export type MechanicLeanDocument = MechanicDocumentData & {
  _id: Types.ObjectId;
};

export type MechanicWithRelationsLeanDocument = Omit<
  MechanicLeanDocument,
  'specializations' | 'workDirections'
> & {
  specializations: SpecializationLeanDocument[];
  workDirections: WorkDirectionLeanDocument[];
};

const nameSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const nameTranslationsSchema = new Schema(
  {
    uk: {
      type: nameSchema,
      required: true,
    },
    en: {
      type: nameSchema,
      required: true,
    },
    pl: {
      type: nameSchema,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const translationSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const translationsSchema = new Schema(
  {
    uk: {
      type: translationSchema,
      required: true,
    },
    en: {
      type: translationSchema,
      required: true,
    },
    pl: {
      type: translationSchema,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const certificatesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    issuer: {
      type: String,
      trim: true,
    },
    issuedAt: {
      type: String,
      trim: true,
    },
    expiresAt: {
      type: String,
      trim: true,
    },
    certificateNumber: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const mechanicSchema = new Schema<MechanicDocumentData>(
  {
    name: {
      type: nameTranslationsSchema,
      required: true,
    },
    photo: {
      url: {
        type: String,
        default: null,
      },
    },
    specializations: {
      type: [Schema.Types.ObjectId],
      ref: 'specializations',
    },
    workDirections: {
      type: [Schema.Types.ObjectId],
      ref: 'work-directions',
    },
    translations: {
      type: translationsSchema,
      required: true,
    },
    experienceYears: {
      type: Number,
      min: 1,
    },
    certificates: {
      type: [certificatesSchema],
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    sortOrder: {
      type: Number,
      required: true,
      min: 1,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MechanicCollection = model<MechanicDocumentData>(
  'mechanics',
  mechanicSchema,
);
