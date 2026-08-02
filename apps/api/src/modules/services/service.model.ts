import { model, Schema, type Types } from 'mongoose';

import {
  serviceCategories,
  serviceIconKeys,
  type ServiceCategory,
  type ServiceIconKey,
  type ServiceLocale,
} from '@autoservice/contracts';

export interface ServiceTranslationPersistence {
  title: string;
  description: string;
}

export interface ServicePersistence {
  slug: string;
  category: ServiceCategory;
  iconKey: ServiceIconKey;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  translations: Record<ServiceLocale, ServiceTranslationPersistence>;
}

export type ServiceLeanDocument = ServicePersistence & {
  _id: Types.ObjectId;
};

const serviceTranslationSchema = new Schema(
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

const serviceTranslationsSchema = new Schema(
  {
    uk: {
      type: serviceTranslationSchema,
      required: true,
    },
    en: {
      type: serviceTranslationSchema,
      required: true,
    },
    pl: {
      type: serviceTranslationSchema,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const serviceSchema = new Schema<ServicePersistence>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: serviceCategories,
      required: true,
      trim: true,
      lowercase: true,
    },
    iconKey: {
      type: String,
      enum: serviceIconKeys,
      required: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    sortOrder: {
      type: Number,
      required: true,
      min: 1,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    translations: {
      type: serviceTranslationsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ServiceCollection = model<ServicePersistence>(
  'services',
  serviceSchema,
);
