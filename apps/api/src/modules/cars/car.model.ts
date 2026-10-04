import { model, Schema, type Types } from 'mongoose';
import {
  fuelTypeSchema,
  transmissionSchema,
  bodyTypeSchema,
  type BodyType,
  type FuelType,
  type Transmission,
} from '@autoservice/contracts';

export interface CarPersistence {
  ownerId: Types.ObjectId;

  brand: string;
  model: string;
  year: number;

  licensePlate: string | null;
  vin: string;

  mileage: number | null;
  photos: string[];

  generation: string | null;
  bodyType: BodyType | null;
  fuelType: FuelType | null;
  transmission: Transmission | null;

  engine: string | null;
  color: string | null;

  registrationDate: Date | null;
  countryOfRegistration: string | null;

  notes: string | null;
  isActive: boolean;
}

export interface CarTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type CarDocumentData = CarPersistence & CarTimestamps;

export type CarLeanDocument = CarDocumentData & {
  _id: Types.ObjectId;
};

const carSchema = new Schema<CarDocumentData>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    licensePlate: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
    },

    vin: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    mileage: {
      type: Number,
      min: 0,
      default: null,
    },

    photos: {
      type: [String],
      default: [],
    },

    generation: {
      type: String,
      trim: true,
      default: null,
    },

    bodyType: {
      type: String,
      enum: bodyTypeSchema.options,
      default: null,
    },

    fuelType: {
      type: String,
      enum: fuelTypeSchema.options,
      default: null,
    },

    transmission: {
      type: String,
      enum: transmissionSchema.options,
      default: null,
    },

    engine: {
      type: String,
      trim: true,
      default: null,
    },

    color: {
      type: String,
      trim: true,
      default: null,
    },

    registrationDate: {
      type: Date,
      default: null,
    },

    countryOfRegistration: {
      type: String,
      trim: true,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CarCollection = model<CarDocumentData>('cars', carSchema);
