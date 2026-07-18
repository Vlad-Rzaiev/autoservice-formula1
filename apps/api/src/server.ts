import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { pinoHttp } from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';

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

  app.use(cors());
  app.use(express.json());
  app.use(
    pinoHttp({
      logger,
    }),
  );

  app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Autoservice API working!',
    });
  });

  app.listen(PORT, () => {
    logger.info(
      {
        PORT,
      },
      `Server started on http://localhost:${PORT}`,
    );
  });
};
