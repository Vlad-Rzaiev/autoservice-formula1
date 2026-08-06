import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer;

process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/autoservice-test';
process.env.CORS_ORIGINS = 'http://localhost:3000';
process.env.PORT = '7777';

beforeAll(async (): Promise<void> => {
  mongoMemoryServer = await MongoMemoryServer.create();

  const testMongoUri = mongoMemoryServer.getUri();

  await mongoose.connect(testMongoUri);
});

afterEach(async (): Promise<void> => {
  const mongooseCollections = mongoose.connection.collections;

  for (const collection of Object.values(mongooseCollections)) {
    await collection.deleteMany({});
  }
});

afterAll(async (): Promise<void> => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});
