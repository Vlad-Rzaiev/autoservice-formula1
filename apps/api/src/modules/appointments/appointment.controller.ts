import createHttpError from 'http-errors';
import type { RequestHandler } from 'express';
import {
  appointmentsListQuerySchema,
  type CreateAppointmentInput,
  type UpdateAppointmentInput,
} from '@autoservice/contracts';
import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
  createAppointment,
  getAppointmentById,
  getAppointments,
  markAppointmentNoShow,
  startAppointment,
  updateAppointment,
} from './appointment.service.js';
import { toAppointmentDto } from './appointment.mapper.js';

export const getAppointmentsController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const validationResult = appointmentsListQuerySchema.safeParse(req.query);

  if (!validationResult.success) {
    throw createHttpError(400, 'Invalid query parameters.', {
      details: validationResult.error.flatten(),
    });
  }

  const result = await getAppointments(validationResult.data, req.user);

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointments successfully retrieved.',
    data: {
      items: result.appointments.map(toAppointmentDto),
      pagination: result.pagination,
    },
  });
};

export const getAppointmentByIdController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await getAppointmentById(
    req.params.appointmentId as string,
    req.user,
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointment successfully retrieved.',
    data: toAppointmentDto(appointment),
  });
};

export const createAppointmentController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await createAppointment(
    req.body as CreateAppointmentInput,
    req.user,
  );

  res.status(201).json({
    status: 201,
    success: true,
    message: 'Appointment successfully created.',
    data: toAppointmentDto(appointment),
  });
};

export const updateAppointmentController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await updateAppointment(
    req.params.appointmentId as string,
    req.body as UpdateAppointmentInput,
    req.user,
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointment successfully updated.',
    data: toAppointmentDto(appointment),
  });
};

export const confirmAppointmentController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await confirmAppointment(
    req.params.appointmentId as string,
    req.user,
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointment successfully confirmed.',
    data: toAppointmentDto(appointment),
  });
};

export const startAppointmentController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await startAppointment(
    req.params.appointmentId as string,
    req.user,
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointment successfully started.',
    data: toAppointmentDto(appointment),
  });
};

export const completeAppointmentController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await completeAppointment(
    req.params.appointmentId as string,
    req.user,
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointment successfully completed.',
    data: toAppointmentDto(appointment),
  });
};

export const cancelAppointmentController: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await cancelAppointment(
    req.params.appointmentId as string,
    req.user,
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointment successfully cancelled.',
    data: toAppointmentDto(appointment),
  });
};

export const markAppointmentNoShowController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication required.');
  }

  const appointment = await markAppointmentNoShow(
    req.params.appointmentId as string,
    req.user,
  );

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Appointment marked as no-show.',
    data: toAppointmentDto(appointment),
  });
};
