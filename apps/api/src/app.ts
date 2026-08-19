import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import { pinoHttp } from 'pino-http';
import { logger } from './config/logger.js';

import { notFoundHandler } from './middleware/not-found-handler.js';
import { errorHandler } from './middleware/error-handler.js';

import { isOriginAllowed } from './utils/is-origin-allowed.js';
import { publicApiRateLimit } from './middleware/rate-limit.js';

import healthRouter from './modules/health/health.routes.js';
import servicesRouter from './modules/services/service.routes.js';
import completedWorksRouter from './modules/completed-works/completed-works.routes.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');

  app.use(
    pinoHttp({
      logger,
      genReqId(req, res) {
        const incomingId = req.headers['x-request-id'];

        const requestId =
          typeof incomingId === 'string' ? incomingId : crypto.randomUUID();

        res.setHeader('x-request-id', requestId);

        return requestId;
      },
    }),
  );

  app.use(helmet());

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || isOriginAllowed(origin)) {
          callback(null, true);
          return;
        }

        logger.warn(
          {
            origin,
          },
          'CORS origin rejected',
        );

        callback(
          createHttpError(403, 'Origin is not allowed by CORS', {
            code: 'CORS_ORIGIN_NOT_ALLOWED',
          }),
        );
      },

      credentials: true,
    }),
  );

  app.use(express.json());

  app.use('/health', healthRouter);

  app.use('/api', publicApiRateLimit);

  app.use('/api/v1/services', servicesRouter);

  app.use('/api/v1/completed-works', completedWorksRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
