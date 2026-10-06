import { model, Schema, type Types } from 'mongoose';
import { repairStatusSchema, type RepairStatus } from '@autoservice/contracts';

export interface RepairPersistence {
  clientId: Types.ObjectId;
  carId: Types.ObjectId;
  serviceId: Types.ObjectId | null;
  assignedMechanicId: Types.ObjectId | null;
  status: RepairStatus;
  title: string;
  description: string | null;
  diagnosis: string | null;
  estimatedCost: number | null;
  finalCost: number | null;
  mileage: number | null;
  photos: {
    before: string[];
    after: string[];
  };
  approval: {
    approvedAt: Date | null;
    approvedBy: Types.ObjectId | null;
    approvedVia: 'client' | 'phone' | null;
  };
  startedAt: Date | null;
  completedAt: Date | null;
  notes: string | null;
}

export interface RepairTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type RepairDocumentData = RepairPersistence & RepairTimestamps;

export type RepairLeanDocument = RepairDocumentData & {
  _id: Types.ObjectId;
};

const repairSchema = new Schema<RepairDocumentData>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },

    carId: {
      type: Schema.Types.ObjectId,
      ref: 'cars',
      required: true,
    },

    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'services',
      default: null,
    },

    assignedMechanicId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      default: null,
    },

    status: {
      type: String,
      enum: repairStatusSchema.options,
      required: true,
      default: 'pending',
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    diagnosis: {
      type: String,
      trim: true,
      default: null,
    },

    estimatedCost: {
      type: Number,
      min: 0,
      default: null,
    },

    finalCost: {
      type: Number,
      min: 0,
      default: null,
    },

    mileage: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'Mileage must be an integer.',
      },
      default: null,
    },

    photos: {
      before: {
        type: [String],
        default: [],
      },
      after: {
        type: [String],
        default: [],
      },
    },

    approval: {
      approvedAt: {
        type: Date,
        default: null,
      },

      approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null,
      },

      approvedVia: {
        type: String,
        enum: ['client', 'phone'],
        default: null,
      },
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

repairSchema.index({ clientId: 1, createdAt: -1 });
repairSchema.index({ assignedMechanicId: 1, createdAt: -1 });
repairSchema.index({ carId: 1, createdAt: -1 });
repairSchema.index({ status: 1, createdAt: -1 });

export const RepairCollection = model<RepairDocumentData>(
  'repairs',
  repairSchema,
);
