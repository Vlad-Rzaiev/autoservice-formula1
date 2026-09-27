import type { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import type { ApiSuccess } from '@autoservice/contracts';
import {
  resendEmailVerification,
  verifyUserEmail,
} from './email-verification.service.js';

export const verifyEmailController: RequestHandler = async (req, res) => {
  const { token } = req.query;

  if (typeof token !== 'string' || !token) {
    throw createHttpError(400, 'Verification token is required.');
  }

  await verifyUserEmail(token);

  const response: ApiSuccess<null> = {
    status: 200,
    success: true,
    message: 'Email successfully verified.',
    data: null,
  };

  res.status(200).json(response);
};

export const resendEmailVerificationController: RequestHandler = async (
  req,
  res,
) => {
  if (!req.user) {
    throw createHttpError(401, 'Authentication is required.');
  }

  const { userId } = req.user;
  const { locale } = req.body;

  await resendEmailVerification(userId, locale);

  const response = {
    status: 200,
    success: true,
    message: 'Verification email successfully resent.',
    data: null,
  };

  res.status(200).json(response);
};
