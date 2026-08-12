import { z } from 'zod';

export function createApiResponseSchema<TDataSchema extends z.ZodType>(
  dataSchema: TDataSchema,
) {
  return z.object({
    status: z.number().int(),
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });
}
