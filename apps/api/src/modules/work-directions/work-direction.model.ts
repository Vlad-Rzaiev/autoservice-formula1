import { model, Schema, type Types } from 'mongoose';
import { AppLocale } from '@autoservice/contracts';

export interface WorkDirectionTranslationPersistence {
  title: string;
}

export interface WorkDirectionPersistence {
  slug: string;
  translations: Record<AppLocale, WorkDirectionTranslationPersistence>;
  isActive: boolean;
  sortOrder: number;
}

export interface WorkDirectionTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type WorkDirectionDocumentData = WorkDirectionPersistence &
  WorkDirectionTimestamps;

export type WorkDirectionLeanDocument = WorkDirectionDocumentData & {
  _id: Types.ObjectId;
};

const workDirectionTranslationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const workDirectionTranslationsSchema = new Schema(
  {
    uk: {
      type: workDirectionTranslationSchema,
      required: true,
    },
    en: {
      type: workDirectionTranslationSchema,
      required: true,
    },
    pl: {
      type: workDirectionTranslationSchema,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const workDirectionSchema = new Schema<WorkDirectionDocumentData>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    translations: {
      type: workDirectionTranslationsSchema,
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

export const WorkDirectionCollection = model<WorkDirectionDocumentData>(
  'work-directions',
  workDirectionSchema,
);
