import { Router } from 'express';
import { getSpecializationByIdSchema } from '@autoservice/contracts';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateParams } from '../../middleware/validate-params.js';

import {
  getAllSpecializationsController,
  getSpecializationByIdController,
} from './specialization.controller.js';

const router = Router();

router.get('/', ctrlWrapper(getAllSpecializationsController));

router.get(
  '/:specializationId',
  validateParams(getSpecializationByIdSchema),
  ctrlWrapper(getSpecializationByIdController),
);

export default router;
