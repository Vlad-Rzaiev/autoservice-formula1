import type { Server } from 'node:http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './config/logger.js';

export const startServer = (): Server => {
  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(
      {
        port: env.PORT,
      },
      `Server started on http://localhost:${env.PORT}`,
    );
  });

  return server;
};
