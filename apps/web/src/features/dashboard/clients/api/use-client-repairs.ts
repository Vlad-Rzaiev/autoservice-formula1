import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/providers';
import { clientRepairsQueryOptions } from '../api/client-history-query-options';

interface UseClientRepairsOptions {
  clientId: string;
  page: number;
  limit: number;
}

export function useClientRepairs({
  clientId,
  page,
  limit,
}: UseClientRepairsOptions) {
  const { user, accessToken } = useAuth();

  return useQuery(
    clientRepairsQueryOptions({
      clientId,
      userId: user?.userId,
      role: user?.role,
      accessToken,
      page,
      limit,
    }),
  );
}
