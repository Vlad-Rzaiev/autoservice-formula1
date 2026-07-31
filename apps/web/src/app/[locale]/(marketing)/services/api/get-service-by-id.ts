import type { ServiceDto, ServiceResponse } from "@autoservice/contracts";

import { apiClient } from "@/lib/api/api-client";

interface GetServiceByIdOptions {
  signal?: AbortSignal;
}

export async function getServiceById(
  serviceId: string,
  options: GetServiceByIdOptions = {},
): Promise<ServiceDto> {
  const normalizedServiceId = serviceId.trim();

  if (!normalizedServiceId) {
    throw new Error("Service ID is required!");
  }

  const response = await apiClient.get<ServiceResponse>(
    `/services/${encodeURIComponent(normalizedServiceId)}`,
    {
      signal: options.signal,
    },
  );

  const responseBody = response.data;

  if (!responseBody.success) {
    throw new Error(responseBody.message || "Failed to load service.");
  }

  return responseBody.data;
}
