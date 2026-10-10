import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import {
  approveRepairSchema,
  createRepairSchema,
  mongoObjectIdSchema,
  RepairResponse,
  repairsListQuerySchema,
  updateRepairSchema,
  type RepairsListResponse,
} from '@autoservice/contracts';
import { toRepairDto } from './repair.mapper.js';
import {
  acceptRepair,
  approveRepair,
  cancelRepair,
  completeRepair,
  createRepair,
  getRepairById,
  getRepairs,
  requestApprovalRepair,
  resumeRepair,
  startRepair,
  updateRepair,
  waitingPartsRepair,
} from './repair.service.js';

export const getRepairsController: RequestHandler = async (req, res) => {
  const validationResult = repairsListQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid query parameters', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const { repairs, pagination } = await getRepairs(
    validationResult.data,
    req.user,
  );

  const responseBody: RepairsListResponse = {
    status: 200,
    success: true,
    message: 'Successfully found repairs.',
    data: {
      items: repairs.map(toRepairDto),
      pagination,
    },
  };

  res.status(responseBody.status).json(responseBody);
};

export const getRepairController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await getRepairById(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Successfully found repair.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const createRepairController: RequestHandler = async (req, res) => {
  const validationResult = createRepairSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid request body', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repair = await createRepair(validationResult.data, req.user);

  const responseBody: RepairResponse = {
    status: 201,
    success: true,
    message: 'Repair successfully created.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const updateRepairController: RequestHandler = async (req, res) => {
  const validationResult = updateRepairSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid request body', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await updateRepair(repairId, validationResult.data, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully updated.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const acceptRepairController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await acceptRepair(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully accepted.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const startRepairController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await startRepair(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully started.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const waitingPartsRepairController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await waitingPartsRepair(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully marked as waiting for parts.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const resumeRepairController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await resumeRepair(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully resumed.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const requestApprovalRepairController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await requestApprovalRepair(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair approval successfully requested.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const approveRepairController: RequestHandler = async (req, res) => {
  const validationResult = approveRepairSchema.safeParse(req.body);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid request body', {
      details: validationResult.error.flatten(),
    });
  }

  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await approveRepair(repairId, validationResult.data, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully approved.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const cancelRepairController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await cancelRepair(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully cancelled.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};

export const completeRepairController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const repairId = req.params.id;

  if (typeof repairId !== 'string') {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repairIdValidation = mongoObjectIdSchema.safeParse(repairId);

  if (!repairIdValidation.success) {
    throw createHttpError(400, 'Invalid repair id.');
  }

  const repair = await completeRepair(repairId, req.user);

  const responseBody: RepairResponse = {
    status: 200,
    success: true,
    message: 'Repair successfully completed.',
    data: toRepairDto(repair),
  };

  res.status(responseBody.status).json(responseBody);
};
