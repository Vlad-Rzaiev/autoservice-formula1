import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  PORT: z.coerce.number().int().min(1).max(65535).default(7777),

  MONGODB_USER: z.string().min(1, 'MONGODB_USER is required'),

  MONGODB_PASSWORD: z.string().min(1, 'MONGODB_PASSWORD is required'),

  MONGODB_URL: z.string().min(1, 'MONGODB_URL is required'),

  MONGODB_DB: z.string().min(1, 'MONGODB_DB is required'),

  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000')
    .transform((value) =>
      value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),

  VERCEL_PROJECT_NAME: z.string().min(1).optional(),

  VERCEL_TEAM_SLUG: z.string().min(1).optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    z.treeifyError(parsedEnv.error),
  );

  throw new Error('Invalid environment configuration');
}

const parsedEnvironment = parsedEnv.data;

const encodedMongoUser = encodeURIComponent(parsedEnvironment.MONGODB_USER);
const encodedMongoPassword = encodeURIComponent(
  parsedEnvironment.MONGODB_PASSWORD,
);

export const env = {
  ...parsedEnvironment,

  MONGODB_URI:
    `mongodb+srv://${encodedMongoUser}:${encodedMongoPassword}` +
    `@${parsedEnvironment.MONGODB_URL}/${parsedEnvironment.MONGODB_DB}` +
    '?retryWrites=true&w=majority',
};
