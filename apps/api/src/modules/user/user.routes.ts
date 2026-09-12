import { Router } from 'express';
import {
  loginRequestSchema,
  registerRequestSchema,
} from '@autoservice/contracts';
import { validateBody } from '../../middleware/validate-body.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from './user.controller.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerRequestSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginRequestSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshTokenController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
