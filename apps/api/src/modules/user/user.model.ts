import { model, Schema, type Types } from 'mongoose';
import {
  userGenderVariants,
  userRole,
  type UserGenderVariants,
  type UserRole,
} from '@autoservice/contracts';

export interface UserPersistence {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
  gender: UserGenderVariants | null;
  birthDate: string | null;
  phone: string | null;
  email: string;
  emailVerified: boolean;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocumentData = UserPersistence & UserTimestamps;

export type UserLeanDocument = UserDocumentData & {
  _id: Types.ObjectId;
};

const userSchema = new Schema<UserDocumentData>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
      default: null,
    },
    lastName: {
      type: String,
      trim: true,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      enum: userGenderVariants,
      default: null,
    },
    birthDate: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      enum: userRole,
      required: true,
      default: 'client',
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

export const UserCollection = model<UserDocumentData>('users', userSchema);
