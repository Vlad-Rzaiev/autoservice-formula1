import { Router } from 'express';
import mongoose from 'mongoose';
import { sendApiError } from '../../utils/send-api-error.js';

const healthRouter = Router();

healthRouter.get('/live', (_req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    message: 'Service is live',
    data: {
      status: 'alive',
    },
  });
});

healthRouter.get('/ready', (_req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;

  if (!isMongoConnected) {
    sendApiError(res, {
      status: 503,
      code: 'DATABASE_UNAVAILABLE',
      message: 'Database is not connected.',
    });

    return;
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Database is connected.',
    data: {
      database: 'connected',
    },
  });
});

export default healthRouter;
