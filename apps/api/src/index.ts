import mongoose from 'mongoose';
import { initMongoDB } from './config/initMongoDB.js';
import { logger } from './config/logger.js';
import { startServer } from './server.js';
import { synchronizeServiceSortOrderCounter } from './modules/counters/synchronize-service-sort-order-counter.js';

const bootstrap = async (): Promise<void> => {
  try {
    await initMongoDB();
    await synchronizeServiceSortOrderCounter();

    const server = startServer();

    const shutdown = (signal: string): void => {
      logger.info({ signal }, 'Graceful shutdown started');

      server.close(async (error?: Error) => {
        if (error) {
          logger.error({ err: error }, 'HTTP server shutdown failed');
          process.exit(1);
        }

        try {
          await mongoose.disconnect();

          logger.info('Graceful shutdown completed');
          process.exit(0);
        } catch (disconnectError: unknown) {
          logger.error({ err: disconnectError }, 'MongoDB shutdown failed');

          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error: unknown) {
    logger.fatal({ err: error }, 'Failed to start Autoservice API');
    process.exit(1);
  }
};

void bootstrap();
