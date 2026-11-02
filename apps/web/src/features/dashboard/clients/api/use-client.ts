import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/providers';
import { clientQueryOptions } from './clients-query-options';

export function useClient(clientId: string) {
  const { user, accessToken } = useAuth();

  return useQuery(
    clientQueryOptions({
      clientId,
      userId: user?.userId,
      role: user?.role,
      accessToken,
    }),
  );
}
