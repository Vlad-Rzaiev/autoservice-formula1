import { queryOptions } from '@tanstack/react-query';
import { getCompletedWorks } from './get-completed-works';
import { getCompletedWorkById } from './get-completed-work-by-id';

import { STALE_TIME_MS } from '../../lib/constants';

export const completedWorksQueryKeys = {
  all: ['completed-works'] as const,

  lists: () => [...completedWorksQueryKeys.all, 'list'] as const,

  list: () => [...completedWorksQueryKeys.lists(), 'all'] as const,

  details: () => [...completedWorksQueryKeys.all, 'detail'] as const,

  detail: (completedWorkId: string) =>
    [...completedWorksQueryKeys.details(), completedWorkId] as const,
};

export const completedWorksQueryOptions = queryOptions({
  queryKey: completedWorksQueryKeys.list(),
  queryFn: ({ signal }) => getCompletedWorks({ signal }),
  staleTime: STALE_TIME_MS,
});

export function completedWorkByIdQueryOptions(completedWorkId: string) {
  return queryOptions({
    queryKey: completedWorksQueryKeys.detail(completedWorkId),
    queryFn: ({ signal }) => getCompletedWorkById(completedWorkId, { signal }),
    staleTime: STALE_TIME_MS,
    enabled: Boolean(completedWorkId),
  });
}
