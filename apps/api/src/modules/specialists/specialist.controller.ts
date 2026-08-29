import { RequestHandler } from 'express';
import { MechanicResponse, MechanicsResponse } from '@autoservice/contracts';
import { getAllMechanics, getMechanicById } from './specialist.service.js';
import createHttpError from 'http-errors';

interface GetMechanicParams {
  mechanicId: string;
}

export const getMechanicsController: RequestHandler = async (_req, res) => {
  const mechanics = await getAllMechanics();

  const responseBody: MechanicsResponse = {
    status: 200,
    success: true,
    message: 'Successfully found mechanics.',
    data: mechanics,
  };

  res.status(responseBody.status).json(responseBody);
};

export const getMechanicByIdController: RequestHandler<
  GetMechanicParams
> = async (req, res) => {
  const { mechanicId } = req.params;
  const mechanic = await getMechanicById(mechanicId);

  if (!mechanic) {
    throw createHttpError(404, 'Mechanic not found.', {
      code: 'MECHANIC_NOT_FOUND',
    });
  }

  const responseBody: MechanicResponse = {
    status: 200,
    success: true,
    message: `Successfully found mechanic with id ${mechanicId}.`,
    data: mechanic,
  };

  res.status(responseBody.status).json(responseBody);
};
