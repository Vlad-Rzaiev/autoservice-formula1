import { RequestHandler } from 'express';
import {
  getAllCompletedWorks,
  getCompletedWorkById,
} from './completed-works.service.js';
import { toCompletedWorkDto } from './completed-works.mapper.js';
import {
  CompletedWorkResponse,
  CompletedWorksResponse,
} from '@autoservice/contracts';
import createHttpError from 'http-errors';

interface GetCompletedWorkParams {
  completedWorkId: string;
}

export const getCompletedWorksController: RequestHandler = async (
  _req,
  res,
) => {
  const completedWorks = await getAllCompletedWorks();
  const completedWorkDtos = completedWorks.map(toCompletedWorkDto);

  const responseBody: CompletedWorksResponse = {
    status: 200,
    success: true,
    message: 'Successfully found completed works.',
    data: completedWorkDtos,
  };

  res.status(responseBody.status).json(responseBody);
};

export const getCompletedWorkByIdController: RequestHandler<
  GetCompletedWorkParams
> = async (req, res) => {
  const { completedWorkId } = req.params;
  const completedWork = await getCompletedWorkById(completedWorkId);

  if (!completedWork) {
    throw createHttpError(404, 'Completed work not found.', {
      code: 'COMPLETED_WORK_NOT_FOUND',
    });
  }

  const responseBody: CompletedWorkResponse = {
    status: 200,
    success: true,
    message: `Successfully found completed work with id ${completedWorkId}`,
    data: toCompletedWorkDto(completedWork),
  };

  res.status(responseBody.status).json(responseBody);
};
