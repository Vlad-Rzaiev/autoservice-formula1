import { Router } from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateParams } from '../../middleware/validate-params.js';
import { getCompletedWorkByIdParamsSchema } from '@autoservice/contracts';
import {
  getCompletedWorkByIdController,
  getCompletedWorksController,
} from './completed-works.controller.js';

const router = Router();

router.get('/', ctrlWrapper(getCompletedWorksController));

router.get(
  '/:completedWorkId',
  validateParams(getCompletedWorkByIdParamsSchema),
  ctrlWrapper(getCompletedWorkByIdController),
);

export default router;
