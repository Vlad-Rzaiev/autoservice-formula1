import { queryOptions } from '@tanstack/react-query';

import { getMechanics } from './get-mechanics';
import { getMechanicById } from './get-mechanic-by-id';

import { STALE_TIME_MS } from '../../lib/constants';

export const mechanicsQueryKeys = {
  all: ['mechanics'] as const,

  lists: () => [...mechanicsQueryKeys.all, 'list'] as const,

  list: () => [...mechanicsQueryKeys.lists(), 'all'] as const,

  details: () => [...mechanicsQueryKeys.all, 'detail'] as const,

  detail: (mechanicId: string) =>
    [...mechanicsQueryKeys.details(), mechanicId] as const,
};

export const mechanicsQueryOptions = queryOptions({
  queryKey: mechanicsQueryKeys.list(),
  queryFn: ({ signal }) => getMechanics({ signal }),
  staleTime: STALE_TIME_MS,
});

export function mechanicByIdQueryOptions(mechanicId: string) {
  return queryOptions({
    queryKey: mechanicsQueryKeys.detail(mechanicId),
    queryFn: ({ signal }) => getMechanicById(mechanicId, { signal }),
    staleTime: STALE_TIME_MS,
    enabled: Boolean(mechanicId),
  });
}
