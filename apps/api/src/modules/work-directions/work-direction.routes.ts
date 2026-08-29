import { Router } from 'express';
import { getWorkDirectionByIdSchema } from '@autoservice/contracts';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateParams } from '../../middleware/validate-params.js';

import {
  getAllWorkDirectionsController,
  getWorkDirectionByIdController,
} from './work-direction.controller.js';

const router = Router();

router.get('/', ctrlWrapper(getAllWorkDirectionsController));

router.get(
  '/:workDirectionId',
  validateParams(getWorkDirectionByIdSchema),
  ctrlWrapper(getWorkDirectionByIdController),
);

export default router;
