import z from 'zod';

export const userRoleSchema = z.enum([
  'owner',
  'manager',
  'mechanic',
  'client',
]);

export type UserRole = z.infer<typeof userRoleSchema>;

export const userGenderSchema = z.enum(['male', 'female', 'other']).nullable();

export type UserGender = z.infer<typeof userGenderSchema>;

export const phoneSchema = z
  .string()
  .regex(/^\+[1-9]\d{7,14}$/, 'Invalid phone number')
  .nullable();

export type UserPhone = z.infer<typeof phoneSchema>;

export const userDtoSchema = z.object({
  _id: z.string().min(1),
  userId: z.string().min(1),

  firstName: z.string().min(3).max(15).trim().nullable(),
  lastName: z.string().min(3).max(15).trim().nullable(),

  photo: z.string().min(1).nullable(),

  gender: userGenderSchema,

  birthDate: z.iso.date().nullable(),
  phone: phoneSchema,

  email: z.email(),

  role: userRoleSchema,
});

export type User = z.infer<typeof userDtoSchema>;
