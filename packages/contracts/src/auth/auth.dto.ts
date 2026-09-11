import type { User } from './user.schemas.js';

export interface AuthDto {
  user: User;
  accessToken: string;
}
