export interface ApiResponse<TData> {
  status: number;
  success: boolean;
  message: string;
  data: TData;
}
