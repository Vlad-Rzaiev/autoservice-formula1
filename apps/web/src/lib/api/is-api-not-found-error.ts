import axios from "axios";
import { apiErrorSchema } from "@autoservice/contracts";

export function isApiNotFoundError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  if (error.response?.status !== 404) {
    return false;
  }

  const parsedApiError = apiErrorSchema.safeParse(error.response.data);

  if (!parsedApiError.success) {
    return false;
  }

  return parsedApiError.data.code === "SERVICE_NOT_FOUND";
}
