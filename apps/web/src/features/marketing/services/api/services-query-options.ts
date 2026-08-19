import { queryOptions } from '@tanstack/react-query';
import { getServiceBySlug } from './get-service-by-slug';
import { getServices } from './get-services';

import { STALE_TIME_MS } from '../../lib/constants';

export const servicesQueryKeys = {
  all: ['services'] as const,

  lists: () => [...servicesQueryKeys.all, 'list'] as const,

  list: () => [...servicesQueryKeys.lists(), 'all'] as const,

  details: () => [...servicesQueryKeys.all, 'detail'] as const,

  detail: (serviceSlug: string) =>
    [...servicesQueryKeys.details(), serviceSlug] as const,
};

export const servicesQueryOptions = queryOptions({
  queryKey: servicesQueryKeys.list(),
  queryFn: ({ signal }) => getServices({ signal }),
  staleTime: STALE_TIME_MS,
});

export function serviceBySlugQueryOptions(serviceSlug: string) {
  return queryOptions({
    queryKey: servicesQueryKeys.detail(serviceSlug),
    queryFn: ({ signal }) => getServiceBySlug(serviceSlug, { signal }),
    staleTime: STALE_TIME_MS,
    enabled: Boolean(serviceSlug),
  });
}
