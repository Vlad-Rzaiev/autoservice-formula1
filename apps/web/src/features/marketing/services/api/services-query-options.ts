import { queryOptions } from "@tanstack/react-query";
import { getServices, getServiceBySlug } from "@/features/marketing/services";

const servicesStaleTimeMs = 10 * 60 * 1000;

export const servicesQueryKeys = {
  all: ["services"] as const,

  lists: () => [...servicesQueryKeys.all, "list"] as const,

  list: () => [...servicesQueryKeys.lists(), "all"] as const,

  details: () => [...servicesQueryKeys.all, "detail"] as const,

  detail: (serviceSlug: string) =>
    [...servicesQueryKeys.details(), serviceSlug] as const,
};

export const servicesQueryOptions = queryOptions({
  queryKey: servicesQueryKeys.list(),
  queryFn: ({ signal }) => getServices({ signal }),
  staleTime: servicesStaleTimeMs,
});

export function serviceBySlugQueryOptions(serviceSlug: string) {
  return queryOptions({
    queryKey: servicesQueryKeys.detail(serviceSlug),
    queryFn: ({ signal }) => getServiceBySlug(serviceSlug, { signal }),
    staleTime: servicesStaleTimeMs,
    enabled: Boolean(serviceSlug),
  });
}
