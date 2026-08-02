import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';
import { logger } from './logger.js';

export const initMongoDB = async (): Promise<void> => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=TEST-Cluster`,
    );

    logger.info('Mongo connection successfully established!');
  } catch (e) {
    logger.error({ err: e }, 'Error while setting up mongo connection');
    throw e;
  }
};
