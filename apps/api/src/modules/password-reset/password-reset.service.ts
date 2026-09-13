import bcrypt from 'bcrypt';
import {
  ResetEmailRequest,
  ResetPasswordRequest,
} from '@autoservice/contracts';
import createHttpError from 'http-errors';
import { getUserByEmail } from '../user/user.service.js';
import { UserCollection } from '../user/user.model.js';
import { SessionCollection } from '../sessions/session.model.js';
import { generateRefreshToken, hashToken } from '../../utils/token.js';
import { PasswordResetTokenCollection } from './password-reset.model.js';
import { PASSWORD_RESET_TOKEN_VALIDITY } from './password-reset.constants.js';
import { SALT_ROUNDS } from '../user/user.constants.js';
import { sendPasswordResetEmail } from './password-reset.email.js';

export const requestPasswordReset = async ({
  email,
  locale,
}: ResetEmailRequest) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return;
  }

  const token = generateRefreshToken();
  const tokenHash = hashToken(token);

  await PasswordResetTokenCollection.deleteMany({
    userId: user._id,
  }).exec();

  await PasswordResetTokenCollection.create({
    userId: user._id,
    tokenHash,
    validUntil: new Date(Date.now() + PASSWORD_RESET_TOKEN_VALIDITY),
  });

  await sendPasswordResetEmail(user.email, token, locale);

  return token;
};

export const resetPassword = async ({
  token,
  password,
}: ResetPasswordRequest) => {
  const tokenHash = hashToken(token);

  const passwordResetToken = await PasswordResetTokenCollection.findOne({
    tokenHash,
  }).exec();

  if (!passwordResetToken) {
    throw createHttpError(401, 'Invalid or expired password reset token.');
  }

  if (passwordResetToken.validUntil <= new Date()) {
    await PasswordResetTokenCollection.findByIdAndDelete(
      passwordResetToken._id,
    ).exec();

    throw createHttpError(401, 'Invalid or expired password reset token.');
  }

  const user = await UserCollection.findById(passwordResetToken.userId).exec();

  if (!user || !user.isActive) {
    throw createHttpError(401, 'Invalid or expired password reset token.');
  }

  user.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  await user.save();

  await Promise.all([
    PasswordResetTokenCollection.findByIdAndDelete(
      passwordResetToken._id,
    ).exec(),
    SessionCollection.deleteMany({
      userId: user._id,
    }).exec(),
  ]);
};
