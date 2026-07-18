import { initMongoDB } from './config/initMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async (): Promise<void> => {
  try {
    await initMongoDB();

    startServer();
  } catch (error: unknown) {
    console.error('Failed to start Autoservice API:', error);
    process.exit(1);
  }
};

void bootstrap();
