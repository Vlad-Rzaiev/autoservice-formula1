export interface ApiError {
  status: number;
  success: false;
  code: string;
  message: string;
  details?: unknown;
  requestId?: string;
}
