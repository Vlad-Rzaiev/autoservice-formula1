import {
  servicesResponseSchema,
  type ServiceDto,
} from "@autoservice/contracts";

import { apiClient } from "@/lib/api/api-client";

export async function getServices(): Promise<ServiceDto[]> {
  const response = await apiClient.get<unknown>("/services");

  const parsedResponse = servicesResponseSchema.parse(response.data);

  const services: ServiceDto[] = parsedResponse.data;

  return services;
}
