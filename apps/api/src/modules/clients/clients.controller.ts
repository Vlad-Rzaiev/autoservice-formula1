import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import {
  clientListQuerySchema,
  type ClientListResponse,
} from '@autoservice/contracts';
import { toClientDto } from './clients.mapper.js';
import { getClients } from './clients.service.js';

export const getClientsController: RequestHandler = async (req, res) => {
  const validationResult = clientListQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid query parameters', {
      details: validationResult.error.flatten(),
    });
  }

  const { clients, pagination } = await getClients(validationResult.data);

  const responseBody: ClientListResponse = {
    status: 200,
    success: true,
    message: 'Successfully found clients.',
    data: {
      items: clients.map(toClientDto),
      pagination,
    },
  };

  res.status(responseBody.status).json(responseBody);
};
