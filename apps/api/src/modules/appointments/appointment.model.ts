import { model, Schema, type Types } from 'mongoose';
import {
  AppointmentStatus,
  appointmentStatusSchema,
} from '@autoservice/contracts';

export interface AppointmentPersistence {
  clientId: Types.ObjectId;
  carId: Types.ObjectId;
  serviceId: Types.ObjectId | null;
  assignedMechanicId: Types.ObjectId | null;
  scheduledStart: Date;
  scheduledEnd: Date;
  status: AppointmentStatus;
  title: string;
  description: string | null;
  notes: string | null;
  repairId: Types.ObjectId | null;
}

export interface AppointmentTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentDocumentData = AppointmentPersistence &
  AppointmentTimestamps;

export type AppointmentLeanDocument = AppointmentDocumentData & {
  _id: Types.ObjectId;
};

const appointmentSchema = new Schema<AppointmentDocumentData>(
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

    scheduledStart: {
      type: Date,
      required: true,
    },

    scheduledEnd: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: appointmentStatusSchema.options,
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

    notes: {
      type: String,
      trim: true,
      default: null,
    },

    repairId: {
      type: Schema.Types.ObjectId,
      ref: 'repairs',
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

appointmentSchema.index({ clientId: 1, scheduledStart: -1 });
appointmentSchema.index({ assignedMechanicId: 1, scheduledStart: 1 });
appointmentSchema.index({ carId: 1, scheduledStart: -1 });
appointmentSchema.index({ status: 1, scheduledStart: 1 });
appointmentSchema.index({ scheduledStart: 1, scheduledEnd: 1 });

export const AppointmentCollection = model<AppointmentDocumentData>(
  'appointments',
  appointmentSchema,
);
