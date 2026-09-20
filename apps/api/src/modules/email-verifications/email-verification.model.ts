import { model, Schema, type Types } from 'mongoose';

export interface EmailVerificationPersistence {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
}

export type EmailVerificationDocumentData = EmailVerificationPersistence & {
  createdAt: Date;
  updatedAt: Date;
};

const emailVerificationSchema = new Schema<EmailVerificationDocumentData>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      unique: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

emailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EmailVerificationCollection = model<EmailVerificationDocumentData>(
  'email-verifications',
  emailVerificationSchema,
);
