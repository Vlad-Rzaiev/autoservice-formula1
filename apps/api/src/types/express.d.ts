import type { VerifiedAccessToken } from '../utils/jwt.js';

declare global {
  namespace Express {
    interface Request {
      user?: VerifiedAccessToken;
    }
  }
}

export {};
