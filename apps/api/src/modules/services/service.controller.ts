import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { getAllServices, getServiceById } from './service.service.js';

interface GetServiceParams {
  serviceId: string;
}

export const getServicesController: RequestHandler = async (_req, res) => {
  const services = await getAllServices();

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Successfully found services.',
    data: services,
  });
};

export const getServiceByIdController: RequestHandler<
  GetServiceParams
> = async (req, res) => {
  const { serviceId } = req.params;
  const service = await getServiceById(serviceId);

  if (!service) {
    throw createHttpError(404, 'Service not found.');
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: `Successfully found service with id ${serviceId}`,
    data: service,
  });
};
