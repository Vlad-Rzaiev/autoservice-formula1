import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  createCarController,
  createCarPhotoUploadSignatureController,
  deleteCarController,
  getCarByIdController,
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

router.get(
  '/:carId',
  authenticate,
  authorize('owner', 'manager', 'mechanic', 'client'),
  getCarByIdController,
);

router.post(
  '/',
  authenticate,
  authorize('owner', 'manager', 'client'),
  ctrlWrapper(createCarController),
);

router.post(
  '/photo-upload-signature',
  authenticate,
  authorize('owner', 'manager', 'client'),
  ctrlWrapper(createCarPhotoUploadSignatureController),
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
