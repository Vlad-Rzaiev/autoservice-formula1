import { Router } from 'express';
import { getMechanicByIdSchema } from '@autoservice/contracts';
import { validateParams } from '../../middleware/validate-params.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  getMechanicByIdController,
  getMechanicsController,
} from './mechanic.controller.js';

const router = Router();

router.get('/', ctrlWrapper(getMechanicsController));

router.get(
  '/:mechanicId',
  validateParams(getMechanicByIdSchema),
  ctrlWrapper(getMechanicByIdController),
);

export default router;
