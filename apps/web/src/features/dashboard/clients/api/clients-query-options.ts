import { queryOptions } from '@tanstack/react-query';

import type { UserRole } from '@autoservice/contracts';

import { getClients } from './get-clients';

export const clientsQueryKeys = {
  all: ['clients'] as const,

  list: (
    userId: string | undefined,
    role: UserRole | undefined,
    page: number,
    limit: number,
    search: string,
  ) =>
    [
      ...clientsQueryKeys.all,
      'list',
      userId ?? null,
      role ?? null,
      { page, limit, search },
    ] as const,
};

interface ClientsQueryOptions {
  userId: string | undefined;
  role: UserRole | undefined;
  accessToken: string | null;
  page?: number;
  limit?: number;
  search?: string;
}

export function clientsQueryOptions({
  userId,
  role,
  accessToken,
  page = 1,
  limit = 100,
  search = '',
}: ClientsQueryOptions) {
  return queryOptions({
    queryKey: clientsQueryKeys.list(userId, role, page, limit, search),
    queryFn: ({ signal }) => getClients({ page, limit, search, signal }),
    staleTime: 30_000,
    enabled: Boolean(
      userId && accessToken && (role === 'owner' || role === 'manager'),
    ),
    retry: false,
  });
}
