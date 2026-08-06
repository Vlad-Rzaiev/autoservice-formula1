import type { RequestHandler } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import createHttpError from 'http-errors';

import type {
  ServiceResponse,
  ServicesResponse,
  CreateServiceInput,
  ApiSuccess,
  ServiceDto,
} from '@autoservice/contracts';
import {
  createService,
  getAllServices,
  getServiceBySlug,
} from './service.service.js';
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
    throw createHttpError(404, 'Service not found.', {
      code: 'SERVICE_NOT_FOUND',
    });
  }

  const responseBody: ServiceResponse = {
    status: 200,
    success: true,
    message: `Successfully found service with slug ${serviceSlug}.`,
    data: toServiceDto(service),
  };

  res.status(responseBody.status).json(responseBody);
};

export const createServiceController: RequestHandler<
  ParamsDictionary,
  ApiSuccess<ServiceDto>,
  CreateServiceInput
> = async (req, res) => {
  const createdService = await createService(req.body);
  const serviceDto = toServiceDto(createdService);

  res.status(201).json({
    status: 201,
    success: true,
    message: 'Service successfully created.',
    data: serviceDto,
  });
};
