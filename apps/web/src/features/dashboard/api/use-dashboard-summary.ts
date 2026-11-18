import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/providers';

import { dashboardSummaryQueryOptions } from './dashboard-query-options';

export function useDashboardSummary(clientId?: string) {
  const { user, accessToken } = useAuth();

  return useQuery(
    dashboardSummaryQueryOptions(
      user?.userId,
      user?.role,
      accessToken,
      clientId,
    ),
  );
}
