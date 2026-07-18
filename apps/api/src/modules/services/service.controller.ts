import { RequestHandler } from 'express';
import { getAllServices } from './service.service.js';

export const getServicesController: RequestHandler = async (_req, res) => {
  const services = await getAllServices();

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Successfully found services.',
    data: services,
  });
};
