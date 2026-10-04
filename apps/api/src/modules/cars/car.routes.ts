import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  createCarController,
  deleteCarController,
  getCarsController,
  updateCarController,
} from './car.controller.js';

const router = Router();

router.get(
  '/',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(getCarsController),
);

router.post(
  '/',
  authenticate,
  authorize('owner', 'manager', 'client'),
  ctrlWrapper(createCarController),
);

router.patch(
  '/:id',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(updateCarController),
);

router.delete(
  '/:id',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  ctrlWrapper(deleteCarController),
);

export default router;
