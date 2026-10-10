import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  cancelAppointmentController,
  completeAppointmentController,
  confirmAppointmentController,
  createAppointmentController,
  getAppointmentByIdController,
  getAppointmentsController,
  markAppointmentNoShowController,
  startAppointmentController,
  updateAppointmentController,
} from './appointment.controller.js';
import { validateBody } from '../../middleware/validate-body.js';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from '@autoservice/contracts';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getAppointmentsController));

router.get(
  '/:appointmentId',
  authenticate,
  ctrlWrapper(getAppointmentByIdController),
);

router.post(
  '/',
  authenticate,
  validateBody(createAppointmentSchema),
  ctrlWrapper(createAppointmentController),
);

router.patch(
  '/:appointmentId',
  authenticate,
  validateBody(updateAppointmentSchema),
  ctrlWrapper(updateAppointmentController),
);

router.patch(
  '/:appointmentId/confirm',
  authenticate,
  authorize('owner', 'manager'),
  ctrlWrapper(confirmAppointmentController),
);

router.patch(
  '/:appointmentId/start',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(startAppointmentController),
);

router.patch(
  '/:appointmentId/complete',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(completeAppointmentController),
);

router.patch(
  '/:appointmentId/cancel',
  authenticate,
  authorize('owner', 'manager'),
  ctrlWrapper(cancelAppointmentController),
);

router.patch(
  '/:appointmentId/no-show',
  authenticate,
  authorize('owner', 'manager'),
  ctrlWrapper(markAppointmentNoShowController),
);

export default router;
