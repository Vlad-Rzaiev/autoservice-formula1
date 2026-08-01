import type { ServiceResponse, ServicesResponse } from '@autoservice/contracts';
import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { getAllServices, getServiceBySlug } from './service.service.js';
import { toServiceDto } from './service.mapper.js';

interface GetServiceParams {
  serviceSlug: string;
}

export const getServicesController: RequestHandler = async (_req, res) => {
  const services = await getAllServices();
  const serviceDtos = services.map(toServiceDto);

  const responseBody: ServicesResponse = {
    status: 200,
    success: true,
    message: 'Successfully found services.',
    data: serviceDtos,
  };

  res.status(responseBody.status).json(responseBody);
};

export const getServiceBySlugController: RequestHandler<
  GetServiceParams
> = async (req, res) => {
  const { serviceSlug } = req.params;
  const service = await getServiceBySlug(serviceSlug);

  if (!service) {
    throw createHttpError(404, 'Service not found.');
  }

  const responseBody: ServiceResponse = {
    status: 200,
    success: true,
    message: `Successfully found service with id ${serviceSlug}`,
    data: toServiceDto(service),
  };

  res.status(responseBody.status).json(responseBody);
};
