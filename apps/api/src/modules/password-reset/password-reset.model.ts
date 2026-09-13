import { model, Schema, type Types } from 'mongoose';

export interface PasswordResetTokenPersistence {
  userId: Types.ObjectId;
  tokenHash: string;
  validUntil: Date;
}

const passwordResetTokenSchema = new Schema<PasswordResetTokenPersistence>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const PasswordResetTokenCollection =
  model<PasswordResetTokenPersistence>(
    'password-reset-tokens',
    passwordResetTokenSchema,
  );
