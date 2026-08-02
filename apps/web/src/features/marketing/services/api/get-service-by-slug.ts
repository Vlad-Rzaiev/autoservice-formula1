import { serviceResponseSchema, type ServiceDto } from "@autoservice/contracts";

import { apiClient } from "@/lib";

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

  const response = await apiClient.get<unknown>(
    `/services/${encodeURIComponent(normalizedServiceId)}`,
    {
      signal: options.signal,
    },
  );

  const parsedResponse = serviceResponseSchema.parse(response.data);

  return parsedResponse.data;
}
