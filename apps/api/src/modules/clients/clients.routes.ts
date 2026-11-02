import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  getClientByIdController,
  getClientsController,
} from './clients.controller.js';

const router = Router();

router.get(
  '/:clientId',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(getClientByIdController),
);

router.get(
  '/',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(getClientsController),
);

export default router;
