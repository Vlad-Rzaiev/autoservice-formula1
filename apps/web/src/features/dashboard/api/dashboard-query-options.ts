import { queryOptions } from '@tanstack/react-query';
import type { UserRole } from '@autoservice/contracts';

import { getDashboardSummary } from './get-dashboard-summary';

export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  summary: (userId: string | undefined, role: UserRole | undefined) =>
    [
      ...dashboardQueryKeys.all,
      'summary',
      userId ?? null,
      role ?? null,
    ] as const,
};

export function dashboardSummaryQueryOptions(
  userId: string | undefined,
  role: UserRole | undefined,
  accessToken: string | null,
) {
  return queryOptions({
    queryKey: dashboardQueryKeys.summary(userId, role),
    queryFn: ({ signal }) =>
      getDashboardSummary({
        accessToken: accessToken!,
        signal,
      }),
    staleTime: 30_000,
    enabled: Boolean(userId && role && accessToken),
    retry: false,
  });
}
