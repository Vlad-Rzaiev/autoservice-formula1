import { z } from 'zod';

export const apiErrorCodes = {
  SERVICE_NOT_FOUND: 'SERVICE_NOT_FOUND',
  MECHANIC_NOT_FOUND: 'MECHANIC_NOT_FOUND',
  COMPLETED_WORK_NOT_FOUND: 'COMPLETED_WORK_NOT_FOUND',
  SPECIALIZATION_NOT_FOUND: 'SPECIALIZATION_NOT_FOUND',
  WORK_DIRECTION_NOT_FOUND: 'WORK_DIRECTION_NOT_FOUND',
} as const;

export const apiErrorCodeSchema = z.enum(apiErrorCodes);

export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>;
