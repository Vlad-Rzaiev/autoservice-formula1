import { apiClient } from "@/lib/api/api-client";
import type {
  Service,
  ServicesResponse,
} from "@/app/[locale]/(marketing)/services/model/service.types";

interface GetServicesOptions {
  signal?: AbortSignal;
}

export async function getServices(
  options: GetServicesOptions = {},
): Promise<Service[]> {
  const res = await apiClient.get<ServicesResponse>("/services", {
    signal: options.signal,
  });

  const resBody = res.data;

  if (!resBody.success) {
    throw new Error(resBody.message || "Failed to load services.");
  }

  return resBody.data;
}
