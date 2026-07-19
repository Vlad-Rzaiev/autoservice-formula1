import { apiClient } from "@/lib/api/api-client";
import {
  ApiResponse,
  Service,
} from "@/app/[locale]/(marketing)/services/model/service.types";

interface GetServiceByIdOptions {
  signal?: AbortSignal;
}

export async function getServiceById(
  serviceId: string,
  options: GetServiceByIdOptions = {},
): Promise<Service> {
  const normalizedServiceId = serviceId.trim();

  if (!normalizedServiceId) {
    throw new Error("Service ID is required!");
  }

  const res = await apiClient.get<ApiResponse<Service>>(
    `/services/${encodeURIComponent(normalizedServiceId)}`,
    {
      signal: options.signal,
    },
  );

  const resBody = res.data;

  if (!resBody.success) {
    throw new Error(resBody.message || "Failed to load service.");
  }

  return resBody.data;
}
