import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';

export const initMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    logger.info('Mongo connection successfully established!');
  } catch (connectionError: unknown) {
    logger.error(
      { err: connectionError },
      'Error while setting up mongo connection',
    );
    throw connectionError;
  }
};
