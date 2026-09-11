import bcrypt from 'bcrypt';

import type { LoginDto, RegisterDto } from '@autoservice/contracts';
import { UserCollection } from './user.model.js';

import { SALT_ROUNDS } from './user.constants.js';
import { getNextCounterValue } from '../counters/counter.service.js';
import { USERS_ID_COUNTER_KEY } from '../counters/counter.constants.js';
import createHttpError from 'http-errors';

export const getUserByEmail = async (email: string) => {
  const user = await UserCollection.findOne({
    email,
  })
    .lean()
    .exec();

  return user;
};

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

  return user;
};
