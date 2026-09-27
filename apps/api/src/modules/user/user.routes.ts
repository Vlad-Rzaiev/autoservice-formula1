import { Router } from 'express';
import {
  loginRequestSchema,
  registerRequestSchema,
  resendVerificationEmailRequestSchema,
} from '@autoservice/contracts';
import { validateBody } from '../../middleware/validate-body.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  getCurrentUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from './user.controller.js';
import {
  resendEmailVerificationController,
  verifyEmailController,
} from '../email-verifications/email-verification.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { emailVerificationResendRateLimit } from '../../middleware/rate-limit.js';

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

router.get('/verify-email', ctrlWrapper(verifyEmailController));

router.post(
  '/resend-verification-email',
  emailVerificationResendRateLimit,
  authenticate,
  validateBody(resendVerificationEmailRequestSchema),
  ctrlWrapper(resendEmailVerificationController),
);

router.get('/me', authenticate, ctrlWrapper(getCurrentUserController));

router.post('/refresh', ctrlWrapper(refreshTokenController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
