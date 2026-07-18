import { queryOptions } from "@tanstack/react-query";
import { getServices } from "@/app/[locale]/(marketing)/services/api/get-services";

const servicesStaleTimeMs = 10 * 60 * 1000;

export const servicesQueryKeys = {
  all: ["services"] as const,
  list: () => [...servicesQueryKeys.all, "list"] as const,
};

export const servicesQueryOptions = queryOptions({
  queryKey: servicesQueryKeys.list(),
  queryFn: ({ signal }) => getServices({ signal }),
  staleTime: servicesStaleTimeMs,
});
