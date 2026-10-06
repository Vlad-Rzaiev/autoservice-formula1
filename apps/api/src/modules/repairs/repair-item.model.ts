import { model, Schema, type Types } from 'mongoose';
import {
  repairItemSourceSchema,
  repairItemTypeSchema,
  type RepairItemSource,
  type RepairItemType,
} from '@autoservice/contracts';

export interface RepairItemPersistence {
  repairId: Types.ObjectId;
  type: RepairItemType;
  name: string;
  description: string | null;
  quantity: number;
  unitPrice: number | null;
  totalPrice: number | null;
  source: RepairItemSource;
}

export interface RepairItemTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type RepairItemDocumentData = RepairItemPersistence &
  RepairItemTimestamps;

export type RepairItemLeanDocument = RepairItemDocumentData & {
  _id: Types.ObjectId;
};

const repairItemSchema = new Schema<RepairItemDocumentData>(
  {
    repairId: {
      type: Schema.Types.ObjectId,
      ref: 'repairs',
      required: true,
    },
    type: {
      type: String,
      enum: repairItemTypeSchema.options,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.000001,
    },
    unitPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    totalPrice: {
      type: Number,
      default: null,
      min: 0,
    },
    source: {
      type: String,
      enum: repairItemSourceSchema.options,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RepairItemCollection = model<RepairItemDocumentData>(
  'repair-items',
  repairItemSchema,
);
