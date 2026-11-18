import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/providers';
import { clientAppointmentsQueryOptions } from '../api/client-history-query-options';

interface UseClientAppointmentsOptions {
  clientId: string;
  page: number;
  limit: number;
}

export function useClientAppointments({
  clientId,
  page,
  limit,
}: UseClientAppointmentsOptions) {
  const { user, accessToken } = useAuth();

  return useQuery(
    clientAppointmentsQueryOptions({
      clientId,
      userId: user?.userId,
      role: user?.role,
      accessToken,
      page,
      limit,
    }),
  );
}
