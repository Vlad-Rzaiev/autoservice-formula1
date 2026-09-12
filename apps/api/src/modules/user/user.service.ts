import bcrypt from 'bcrypt';

import type { LoginDto, RegisterDto } from '@autoservice/contracts';
import { UserCollection } from './user.model.js';
import { SessionCollection } from '../sessions/session.model.js';

import createHttpError from 'http-errors';
import { createAccessToken } from '../../utils/jwt.js';
import { getNextCounterValue } from '../counters/counter.service.js';
import { generateRefreshToken, hashToken } from '../../utils/token.js';
import { USERS_ID_COUNTER_KEY } from '../counters/counter.constants.js';
import { SALT_ROUNDS } from './user.constants.js';
import { ONE_DAY, TEN_MINUTES } from '../sessions/session.constants.js';

export const createUser = async (payload: RegisterDto) => {
  const passwordHash = await bcrypt.hash(payload.password, SALT_ROUNDS);

  const userId = String(await getNextCounterValue(USERS_ID_COUNTER_KEY));

  const user = await UserCollection.create({
    ...payload,
    userId,
    passwordHash,
  });

  return user;
};

export const loginUser = async (payload: LoginDto) => {
  const user = await UserCollection.findOne({ email: payload.email }).exec();

  if (!user) {
    throw createHttpError(401, 'Invalid email or password.');
  }

  const isEqual = await bcrypt.compare(payload.password, user.passwordHash);

  if (!isEqual) {
    throw createHttpError(401, 'Invalid email or password.');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = await createAccessToken({
    userId: user.userId,
    role: user.role,
  });

  const refreshToken = generateRefreshToken();

  const session = await SessionCollection.create({
    userId: user._id,
    accessTokenHash: hashToken(accessToken),
    refreshTokenHash: hashToken(refreshToken),
    accessTokenValidUntil: new Date(Date.now() + TEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

  return {
    user,
    sessionId: session._id.toString(),
    accessToken,
    refreshToken,
  };
};

export const refreshSession = async (refreshToken: string) => {
  const refreshTokenHash = hashToken(refreshToken);

  const session = await SessionCollection.findOne({ refreshTokenHash }).exec();

  if (!session) {
    throw createHttpError(401, 'Invalid refresh token.');
  }

  if (session.refreshTokenValidUntil <= new Date()) {
    throw createHttpError(401, 'Refresh token has expired.');
  }

  const user = await UserCollection.findById(session.userId).exec();

  if (!user || !user.isActive) {
    throw createHttpError(401, 'User is not available.');
  }

  const accessToken = await createAccessToken({
    userId: user.userId,
    role: user.role,
  });
  const newRefreshToken = generateRefreshToken();

  session.accessTokenHash = hashToken(accessToken);
  session.refreshTokenHash = hashToken(newRefreshToken);
  session.accessTokenValidUntil = new Date(Date.now() + TEN_MINUTES);
  session.refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  await session.save();

  return {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutUser = async (sessionId: string) => {
  await SessionCollection.findByIdAndDelete(sessionId).exec();
};
