import { RequestHandler } from 'express';
import {
  SpecializationResponse,
  SpecializationsResponse,
} from '@autoservice/contracts';
import { toSpecializationDto } from './specialization.mapper.js';
import {
  getAllSpecializations,
  getSpecializationById,
} from './specialization.service.js';
import createHttpError from 'http-errors';

interface GetSpecializationParams {
  specializationId: string;
}

export const getAllSpecializationsController: RequestHandler = async (
  _req,
  res,
) => {
  const specializations = await getAllSpecializations();
  const specializationDtos = specializations.map(toSpecializationDto);

  const responseBody: SpecializationsResponse = {
    status: 200,
    success: true,
    message: 'Successfully found specializations.',
    data: specializationDtos,
  };

  res.status(responseBody.status).json(responseBody);
};

export const getSpecializationByIdController: RequestHandler<
  GetSpecializationParams
> = async (req, res) => {
  const { specializationId } = req.params;
  const specialization = await getSpecializationById(specializationId);

  if (!specialization) {
    throw createHttpError(404, 'Specialization not found.', {
      code: 'SPECIALIZATION_NOT_FOUND',
    });
  }

  const responseBody: SpecializationResponse = {
    status: 200,
    success: true,
    message: `Successfully found specialization with id ${specializationId}`,
    data: toSpecializationDto(specialization),
  };

  res.status(responseBody.status).json(responseBody);
};
