import axios, { type InternalAxiosRequestConfig } from 'axios';
import {
  getStoredAccessToken,
  refreshAccessTokenOnce,
} from './access-token-store';

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not configured.');
}

export const apiClient = axios.create({
  baseURL: apiBaseURL.replace(/\/+$/, ''),
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getStoredAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    config.headers.delete('Authorization');
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      !getStoredAccessToken()
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessTokenOnce();

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError: unknown) {
      return Promise.reject(refreshError);
    }
  },
);
