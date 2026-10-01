import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { getClientsController } from './clients.controller.js';

const router = Router();

router.get(
  '/',
  authenticate,
  authorize('owner', 'manager', 'mechanic'),
  ctrlWrapper(getClientsController),
);

export default router;
