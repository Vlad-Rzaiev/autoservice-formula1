import { z } from "zod";

export function createApiResponseSchema<TDataSchema extends z.ZodType>(
  dataSchema: TDataSchema,
) {
  return z.object({
    status: z.number().int(),
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });
}
