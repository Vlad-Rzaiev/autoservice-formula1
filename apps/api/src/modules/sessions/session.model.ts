import { model, Schema, type Types } from 'mongoose';

export interface SessionPersistence {
  userId: Types.ObjectId;
  accessTokenHash: string;
  refreshTokenHash: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}

const sessionSchema = new Schema<SessionPersistence>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    accessTokenHash: {
      type: String,
      required: true,
    },
    refreshTokenHash: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionCollection = model<SessionPersistence>(
  'sessions',
  sessionSchema,
);
