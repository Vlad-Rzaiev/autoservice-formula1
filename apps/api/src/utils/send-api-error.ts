import type { Response } from 'express';
import type { ReqId } from 'pino-http';

export interface ApiErrorPayload {
  status: number;
  code: string;
  message: string;
  details?: unknown;
  requestId?: ReqId;
}

export const sendApiError = (
  res: Response,
  { status, code, message, details, requestId }: ApiErrorPayload,
) => {
  return res.status(status).json({
    status,
    success: false,
    code,
    message,
    ...(details !== undefined && { details }),
    ...(requestId !== undefined && { requestId }),
  });
};
