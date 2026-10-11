import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/providers';
import { clientsQueryOptions } from './clients-query-options';

interface UseClientsOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export function useClients(options: UseClientsOptions = {}) {
  const { user, accessToken } = useAuth();

  return useQuery(
    clientsQueryOptions({
      userId: user?.userId,
      role: user?.role,
      accessToken,
      ...options,
    }),
  );
}
