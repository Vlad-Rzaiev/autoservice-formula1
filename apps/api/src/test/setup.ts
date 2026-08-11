import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer;

process.env.NODE_ENV = 'test';
process.env.PORT = '7777';

process.env.MONGODB_USER = 'test-user';
process.env.MONGODB_PASSWORD = 'test-password';
process.env.MONGODB_URL = 'test.mongodb.local';
process.env.MONGODB_DB = 'autoservice-test';

process.env.CORS_ORIGINS = 'http://localhost:3000';

process.env.VERCEL_PROJECT_NAME = 'autoservice-formula1';
process.env.VERCEL_TEAM_SLUG = 'test-team';

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
