import { Router } from 'express';
import { validateBody } from '../../middleware/validate-body.js';
import {
  resetEmailRequestSchema,
  resetPasswordRequestSchema,
} from '@autoservice/contracts';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  requestPasswordResetController,
  resetPasswordController,
} from './password-reset.controller.js';

const router = Router();

router.post(
  '/request-reset-email',
  validateBody(resetEmailRequestSchema),
  ctrlWrapper(requestPasswordResetController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordRequestSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
