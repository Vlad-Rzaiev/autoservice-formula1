import type {
  ApiSuccess,
  ApiSuccessWithoutData,
  AuthDto,
  LoginDto,
  RegisterDto,
  ResetEmailRequest,
  ResetPasswordRequest,
} from '@autoservice/contracts';

import { apiClient } from '@/lib/api/api-client';

const authApiClient = apiClient.create({ withCredentials: true });

export const registerUser = async (payload: RegisterDto): Promise<AuthDto> => {
  const { data } = await authApiClient.post<ApiSuccess<AuthDto>>(
    '/auth/register',
    payload,
  );

  return data.data;
};

export const loginUser = async (payload: LoginDto): Promise<AuthDto> => {
  const { data } = await authApiClient.post<ApiSuccess<AuthDto>>(
    '/auth/login',
    payload,
  );

  return data.data;
};

export const refreshAccessToken = async (): Promise<string> => {
  const { data } =
    await authApiClient.post<ApiSuccess<{ accessToken: string }>>(
      '/auth/refresh',
    );

  return data.data.accessToken;
};

export const logoutUser = async (): Promise<void> => {
  await authApiClient.post('/auth/logout');
};

export const requestPasswordReset = async (
  payload: ResetEmailRequest,
): Promise<void> => {
  await authApiClient.post<ApiSuccessWithoutData>(
    '/auth/request-reset-email',
    payload,
  );
};

export const resetPassword = async (
  payload: ResetPasswordRequest,
): Promise<void> => {
  await authApiClient.post<ApiSuccessWithoutData>(
    '/auth/reset-password',
    payload,
  );
};
