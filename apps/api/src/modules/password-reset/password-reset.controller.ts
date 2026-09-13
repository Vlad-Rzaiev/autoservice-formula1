import type { RequestHandler } from 'express';
import type {
  ApiSuccessWithoutData,
  ResetEmailRequest,
  ResetPasswordRequest,
} from '@autoservice/contracts';

import {
  requestPasswordReset,
  resetPassword,
} from './password-reset.service.js';

export const requestPasswordResetController: RequestHandler<
  Record<string, never>,
  ApiSuccessWithoutData,
  ResetEmailRequest
> = async (req, res) => {
  await requestPasswordReset(req.body);

  res.status(200).json({
    status: 200,
    success: true,
    message: 'If the email is registered, a password reset link has been sent.',
  });
};

export const resetPasswordController: RequestHandler<
  Record<string, never>,
  ApiSuccessWithoutData,
  ResetPasswordRequest
> = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).json({
    status: 200,
    success: true,
    message: 'Password has been successfully reset.',
  });
};
