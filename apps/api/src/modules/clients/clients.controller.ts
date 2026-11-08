import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import {
  clientListQuerySchema,
  mongoObjectIdSchema,
  type ClientResponse,
  type ClientListResponse,
} from '@autoservice/contracts';
import { toClientDto } from './clients.mapper.js';
import { getClientById, getClients } from './clients.service.js';

export const getClientByIdController: RequestHandler = async (req, res) => {
  const validationResult = mongoObjectIdSchema.safeParse(req.params.clientId);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid client ID.', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const client = await getClientById(validationResult.data, req.user);

  const responseBody: ClientResponse = {
    status: 200,
    success: true,
    message: 'Successfully found client.',
    data: toClientDto(client),
  };

  res.status(responseBody.status).json(responseBody);
};

export const getClientsController: RequestHandler = async (req, res) => {
  const validationResult = clientListQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid query parameters', {
      details: validationResult.error.flatten(),
    });
  }

  const { clients, pagination, stats } = await getClients(
    validationResult.data,
  );

  const responseBody: ClientListResponse = {
    status: 200,
    success: true,
    message: 'Successfully found clients.',
    data: {
      items: clients.map(toClientDto),
      pagination,
      stats,
    },
  };

  res.status(responseBody.status).json(responseBody);
};
