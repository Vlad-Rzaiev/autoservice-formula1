import dotenv from 'dotenv';

dotenv.config();

type getEnvVarProps = (name: string, defaultValue?: string) => string;

export const getEnvVar: getEnvVarProps = (name, defaultValue) => {
  const envVar = process.env[name];

  if (envVar) return envVar;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
};
