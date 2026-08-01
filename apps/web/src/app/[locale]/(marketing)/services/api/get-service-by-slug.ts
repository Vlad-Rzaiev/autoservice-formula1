import type { ServiceDto, ServiceResponse } from "@autoservice/contracts";

import { apiClient } from "@/lib/api/api-client";

interface GetServiceBySlugOptions {
  signal?: AbortSignal;
}

export async function getServiceBySlug(
  serviceSlug: string,
  options: GetServiceBySlugOptions = {},
): Promise<ServiceDto> {
  const normalizedServiceId = serviceSlug.trim();

  if (!normalizedServiceId) {
    throw new Error("Service slug is required!");
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
