import { SignJWT, jwtVerify } from 'jose';
import { UserRole, userRoleSchema } from '@autoservice/contracts';

const jwtSecret = process.env.JWT_ACCESS_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_ACCESS_SECRET is not configured.');
}

const secretKey = new TextEncoder().encode(jwtSecret);

interface AccessTokenPayload {
  userId: string;
  role: UserRole;
}

export interface VerifiedAccessToken {
  userId: string;
  role: UserRole;
}

export const createAccessToken = async ({
  userId,
  role,
}: AccessTokenPayload): Promise<string> => {
  return new SignJWT({
    role,
  })
    .setProtectedHeader({
      alg: 'HS256',
    })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(secretKey);
};

export const verifyAccessToken = async (
  token: string,
): Promise<VerifiedAccessToken> => {
  const { payload } = await jwtVerify(token, secretKey);

  if (typeof payload.sub !== 'string') {
    throw new Error('Invalid access token subject.');
  }

  const roleResult = userRoleSchema.safeParse(payload.role);

  if (!roleResult.success) {
    throw new Error('Invalid access token role.');
  }

  return {
    userId: payload.sub,
    role: roleResult.data,
  };
};
