import z from 'zod';
import { supportedLocales } from '../common/locale.js';

export const passwordSchema = z
  .string()
  .min(12, 'Password must be at least 12 characters long.')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  .regex(/\d/, 'Password must contain at least one number.')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character.',
  );

export const registerRequestSchema = z.object({
  firstName: z.string().min(3).max(15).trim().nullable().default(null),
  lastName: z.string().min(3).max(15).trim().nullable().default(null),
  email: z.email(),
  password: passwordSchema,
  locale: z.enum(supportedLocales),
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const resetEmailRequestSchema = z.object({
  email: z.email(),
  locale: z.enum(supportedLocales),
});
export type ResetEmailRequest = z.infer<typeof resetEmailRequestSchema>;

export const resetPasswordRequestSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;
