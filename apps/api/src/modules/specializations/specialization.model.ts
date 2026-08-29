import { model, Schema, type Types } from 'mongoose';
import { AppLocale } from '@autoservice/contracts';

export interface SpecializationTranslationPersistence {
  title: string;
  description: string;
}

export interface SpecializationPersistence {
  slug: string;
  translations: Record<AppLocale, SpecializationTranslationPersistence>;
  isActive: boolean;
  sortOrder: number;
}

export interface SpecializationTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type SpecializationDocumentData = SpecializationPersistence &
  SpecializationTimestamps;

export type SpecializationLeanDocument = SpecializationDocumentData & {
  _id: Types.ObjectId;
};

const specializationTranslationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
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

const specializationTranslationsSchema = new Schema(
  {
    uk: {
      type: specializationTranslationSchema,
      required: true,
    },
    en: {
      type: specializationTranslationSchema,
      required: true,
    },
    pl: {
      type: specializationTranslationSchema,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const specializationSchema = new Schema<SpecializationDocumentData>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    translations: {
      type: specializationTranslationsSchema,
      required: true,
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

export const SpecializationCollection = model<SpecializationDocumentData>(
  'specializations',
  specializationSchema,
);
