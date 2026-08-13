import { env } from '../config/env.js';

const normalizeOrigin = (origin: string): string =>
  origin.trim().replace(/\/+$/, '');

const allowedOrigins = new Set(env.CORS_ORIGINS.map(normalizeOrigin));

const isAllowedVercelPreviewOrigin = (origin: string): boolean => {
  let parsedOrigin: URL;

  try {
    parsedOrigin = new URL(origin);
  } catch {
    return false;
  }

  if (parsedOrigin.protocol !== 'https:') {
    return false;
  }

  if (!env.VERCEL_PROJECT_NAME || !env.VERCEL_TEAM_SLUG) {
    return false;
  }

  const hostname = parsedOrigin.hostname.toLowerCase();
  const projectName = env.VERCEL_PROJECT_NAME.toLowerCase();
  const teamSlug = env.VERCEL_TEAM_SLUG.toLowerCase();

  const expectedPrefix = `${projectName}-`;
  const expectedSuffix = `-${teamSlug}.vercel.app`;

  return (
    hostname.startsWith(expectedPrefix) && hostname.endsWith(expectedSuffix)
  );
};

export const isOriginAllowed = (origin: string): boolean => {
  const normalizedOrigin = normalizeOrigin(origin);

  return (
    allowedOrigins.has(normalizedOrigin) ||
    isAllowedVercelPreviewOrigin(normalizedOrigin)
  );
};
