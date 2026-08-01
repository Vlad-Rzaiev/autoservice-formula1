import {
  servicesResponseSchema,
  type ServiceDto,
} from "@autoservice/contracts";

import { apiClient } from "@/lib/api/api-client";

interface GetServiceBySlugOptions {
  signal?: AbortSignal;
}

export async function getServices(
  options: GetServiceBySlugOptions = {},
): Promise<ServiceDto[]> {
  const response = await apiClient.get<unknown>("/services", {
    signal: options.signal,
  });

  const parsedResponse = servicesResponseSchema.parse(response.data);

  const services: ServiceDto[] = parsedResponse.data;

  return services;
}
