export interface ApiSuccess<TData> {
  status: number;
  success: true;
  message: string;
  data: TData;
}

export interface ApiSuccessWithoutData {
  status: number;
  success: true;
  message: string;
}

export interface ApiError {
  status: number;
  success: false;
  code: string;
  message: string;
  details?: unknown;
  requestId?: string;
}

export type ApiResponse<TData> =
  ApiSuccess<TData> | ApiSuccessWithoutData | ApiError;
