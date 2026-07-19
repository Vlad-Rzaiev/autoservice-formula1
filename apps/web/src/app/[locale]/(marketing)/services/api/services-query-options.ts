import { queryOptions } from "@tanstack/react-query";
import { getServices } from "@/app/[locale]/(marketing)/services/api/get-services";
import { getServiceById } from "@/app/[locale]/(marketing)/services/api/get-service-by-id";

const servicesStaleTimeMs = 10 * 60 * 1000;

export const servicesQueryKeys = {
  all: ["services"] as const,

  lists: () => [...servicesQueryKeys.all, "list"] as const,

  list: () => [...servicesQueryKeys.lists(), "all"] as const,

  details: () => [...servicesQueryKeys.all, "detail"] as const,

  detail: (serviceId: string) =>
    [...servicesQueryKeys.details(), serviceId] as const,
};

export const servicesQueryOptions = queryOptions({
  queryKey: servicesQueryKeys.list(),
  queryFn: ({ signal }) => getServices({ signal }),
  staleTime: servicesStaleTimeMs,
});

export function serviceByIdQueryOptions(serviceId: string) {
  return queryOptions({
    queryKey: servicesQueryKeys.detail(serviceId),
    queryFn: ({ signal }) => getServiceById(serviceId, { signal }),
    staleTime: servicesStaleTimeMs,
    enabled: Boolean(serviceId),
  });
}
