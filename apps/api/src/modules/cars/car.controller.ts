import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import {
  CarResponse,
  carsListQuerySchema,
  createCarSchema,
  mongoObjectIdSchema,
  updateCarSchema,
  type CarsListResponse,
} from '@autoservice/contracts';
import { toCarDto } from './car.mapper.js';
import { createCar, deleteCar, getCars, updateCar } from './car.service.js';

export const getCarsController: RequestHandler = async (req, res) => {
  const validationResult = carsListQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid query parameters', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const { cars, pagination } = await getCars(validationResult.data, req.user);

  const responseBody: CarsListResponse = {
    status: 200,
    success: true,
    message: 'Successfully found cars.',
    data: {
      items: cars.map(toCarDto),
      pagination,
    },
  };

  res.status(responseBody.status).json(responseBody);
};

export const createCarController: RequestHandler = async (req, res) => {
  const validationResult = createCarSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid request body', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const car = await createCar(validationResult.data, req.user);

  const responseBody: CarResponse = {
    status: 201,
    success: true,
    message: 'Car successfully created.',
    data: toCarDto(car),
  };

  res.status(responseBody.status).json(responseBody);
};

export const updateCarController: RequestHandler = async (req, res) => {
  const validationResult = updateCarSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid request body', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const carId = req.params.id;

  if (typeof carId !== 'string') {
    throw createHttpError(400, 'Invalid car id.');
  }

  const carIdValidation = mongoObjectIdSchema.safeParse(carId);

  if (!carIdValidation.success) {
    throw createHttpError(400, 'Invalid car id.');
  }

  const car = await updateCar(carId, validationResult.data, req.user);

  const responseBody: CarResponse = {
    status: 200,
    success: true,
    message: 'Car successfully updated.',
    data: toCarDto(car),
  };

  res.status(responseBody.status).json(responseBody);
};

export const deleteCarController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const carId = req.params.id;

  if (typeof carId !== 'string') {
    throw createHttpError(400, 'Invalid car id.');
  }

  const carIdValidation = mongoObjectIdSchema.safeParse(carId);

  if (!carIdValidation.success) {
    throw createHttpError(400, 'Invalid car id.');
  }

  const car = await deleteCar(carId, req.user);

  const responseBody: CarResponse = {
    status: 200,
    success: true,
    message: 'Car successfully deleted.',
    data: toCarDto(car),
  };

  res.status(responseBody.status).json(responseBody);
};
