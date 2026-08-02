import { z } from "zod";

export const apiErrorSchema = z.object({
  status: z.number().int(),
  success: z.literal(false),
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
  requestId: z.string().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
