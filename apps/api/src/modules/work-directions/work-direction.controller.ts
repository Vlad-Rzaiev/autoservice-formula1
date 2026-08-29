import { RequestHandler } from 'express';
import {
  getAllWorkDirections,
  getWorkDirectionById,
} from './work-direction.service.js';
import { toWorkDirectionDto } from './work-direction.mapper.js';
import {
  WorkDirectionResponse,
  WorkDirectionsResponse,
} from '@autoservice/contracts';
import createHttpError from 'http-errors';

interface GetWorkDirectionParams {
  workDirectionId: string;
}

export const getAllWorkDirectionsController: RequestHandler = async (
  _req,
  res,
) => {
  const workDirections = await getAllWorkDirections();
  const workDirectionDtos = workDirections.map(toWorkDirectionDto);

  const responseBody: WorkDirectionsResponse = {
    status: 200,
    success: true,
    message: 'Successfully found specializations.',
    data: workDirectionDtos,
  };

  res.status(responseBody.status).json(responseBody);
};

export const getWorkDirectionByIdController: RequestHandler<
  GetWorkDirectionParams
> = async (req, res) => {
  const { workDirectionId } = req.params;
  const workDirection = await getWorkDirectionById(workDirectionId);

  if (!workDirection) {
    throw createHttpError(404, 'Work direction not found.', {
      code: 'WORK_DIRECTION_NOT_FOUND',
    });
  }

  const responseBody: WorkDirectionResponse = {
    status: 200,
    success: true,
    message: `Successfully found work direction with id ${workDirectionId}`,
    data: toWorkDirectionDto(workDirection),
  };

  res.status(responseBody.status).json(responseBody);
};
