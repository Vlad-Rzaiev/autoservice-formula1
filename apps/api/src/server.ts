import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import { pinoHttp } from 'pino-http';

import { isOriginAllowed } from './utils/is-origin-allowed.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import servicesRouter from './modules/services/service.routes.js';

const logger = pino({
  transport:
    process.env.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
});

const PORT = Number(getEnvVar('PORT', '7777'));

export const startServer = () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || isOriginAllowed(origin)) {
          callback(null, true);
          return;
        }

        console.warn('CORS origin rejected', {
          origin,
        });

        callback(new Error(`Origin "${origin}" is not allowed by CORS`));
      },

      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(
    pinoHttp({
      logger,
    }),
  );

  app.use(servicesRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.info(
      {
        PORT,
      },
      `Server started on http://localhost:${PORT}`,
    );
  });
};
