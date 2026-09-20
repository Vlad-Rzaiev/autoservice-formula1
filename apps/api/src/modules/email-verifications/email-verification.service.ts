import crypto from 'node:crypto';
import {
  VERIFICATION_TOKEN_BYTES,
  VERIFICATION_TOKEN_TTL,
} from './email-verification.constants.js';
import { EmailVerificationCollection } from './email-verification.model.js';
import createHttpError from 'http-errors';
import { UserCollection } from '../user/user.model.js';

const generateVerificationToken = () => {
  return crypto.randomBytes(VERIFICATION_TOKEN_BYTES).toString('hex');
};

const hashVerificationToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const createEmailVerificationToken = async (userId: string) => {
  const token = generateVerificationToken();
  const tokenHash = hashVerificationToken(token);

  const expiresAt = new Date(Date.now() + VERIFICATION_TOKEN_TTL);

  await EmailVerificationCollection.findOneAndUpdate(
    { userId },
    { userId, tokenHash, expiresAt },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  ).exec();

  return token;
};

export const verifyEmailToken = async (token: string) => {
  const tokenHash = hashVerificationToken(token);

  const verification = await EmailVerificationCollection.findOne({
    tokenHash,
  }).exec();

  if (!verification) {
    throw createHttpError(400, 'Invalid or expired email verification token.');
  }

  if (verification.expiresAt <= new Date()) {
    await verification.deleteOne();

    throw createHttpError(400, 'Invalid or expired email verification token.');
  }

  return verification;
};

export const deleteEmailVerificationToken = async (userId: string) => {
  await EmailVerificationCollection.deleteOne({ userId }).exec();
};

export const verifyUserEmail = async (token: string) => {
  const verification = await verifyEmailToken(token);

  const user = await UserCollection.findById(verification.userId).exec();

  if (!user || !user.isActive) {
    await verification.deleteOne();

    throw createHttpError(400, 'User is not available.');
  }

  if (user.emailVerified) {
    await verification.deleteOne();

    return user;
  }

  user.emailVerified = true;
  await user.save();

  await verification.deleteOne();

  return user;
};
