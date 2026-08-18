import { model, Schema, type Types } from 'mongoose';
import {
  completedWorksCategoriesSlug,
  type CompletedWorksCategorySlug,
} from '@autoservice/contracts';

export interface CompletedWorksCarPersistence {
  make: string;
  model: string;
  year: number;
}

export interface CompletedWorksCategoryPersistence {
  slug: CompletedWorksCategorySlug;
}

export interface CompletedWorksTranslationPersistence {
  customerRequest: string;
  diagnosis: string;
  performedWork: string[];
  result: string;
}

export interface CompletedWorksTranslationsPersistence {
  uk: CompletedWorksTranslationPersistence;
  en: CompletedWorksTranslationPersistence;
  pl: CompletedWorksTranslationPersistence;
}

export interface CompletedWorksImagesPersistence {
  before: string[];
  after: string[];
}

export interface CompletedWorksPersistence {
  slug: string;
  car: CompletedWorksCarPersistence;
  category: CompletedWorksCategoryPersistence;
  translations: CompletedWorksTranslationsPersistence;
  images: CompletedWorksImagesPersistence;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
}

export interface CompletedWorksTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type CompletedWorksDocumentData = CompletedWorksPersistence &
  CompletedWorksTimestamps;

export type CompletedWorksLeanDocument = CompletedWorksDocumentData & {
  _id: Types.ObjectId;
};

const completedWorksCarSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const completedWorkTranslationSchema = new Schema(
  {
    customerRequest: {
      type: String,
      required: true,
      trim: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    performedWork: {
      type: [String],
      required: true,
      validate: {
        validator: (items: string[]) => items.length > 0,
        message: 'At least one performed work item is required',
      },
    },

    result: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const completedWorkTranslationsSchema = new Schema(
  {
    uk: {
      type: completedWorkTranslationSchema,
      required: true,
    },

    en: {
      type: completedWorkTranslationSchema,
      required: true,
    },

    pl: {
      type: completedWorkTranslationSchema,
      required: true,
    },
  },
  { _id: false },
);

const completedWorksSchema = new Schema<CompletedWorksDocumentData>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    car: {
      type: completedWorksCarSchema,
      required: true,
    },

    category: {
      slug: {
        type: String,
        enum: completedWorksCategoriesSlug,
        required: true,
        trim: true,
        lowercase: true,
      },
    },

    translations: {
      type: completedWorkTranslationsSchema,
      required: true,
    },

    images: {
      before: {
        type: [String],
        required: true,
        validate: {
          validator: (images: string[]) => images.length > 0,
          message: 'At least one before image is required',
        },
      },

      after: {
        type: [String],
        required: true,
        validate: {
          validator: (images: string[]) => images.length > 0,
          message: 'At least one after image is required',
        },
      },
    },

    featured: {
      type: Boolean,
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CompletedWorksCollection = model<CompletedWorksDocumentData>(
  'completed-works',
  completedWorksSchema,
);
