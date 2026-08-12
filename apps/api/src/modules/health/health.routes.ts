import { Router } from 'express';
import mongoose from 'mongoose';

const healthRouter = Router();

healthRouter.get('/live', (_req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    data: {
      status: 'alive',
    },
  });
});

healthRouter.get('/ready', (_req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;

  res.status(isMongoConnected ? 200 : 503).json({
    status: isMongoConnected ? 200 : 503,
    success: isMongoConnected,
    data: {
      database: isMongoConnected ? 'connected' : 'disconnected',
    },
  });
});

export default healthRouter;
