import { queryOptions } from '@tanstack/react-query';

import type { UserRole } from '@autoservice/contracts';

import { getClientById, getClients } from './get-clients';

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

  detail: (
    clientId: string,
    userId: string | undefined,
    role: UserRole | undefined,
  ) =>
    [
      ...clientsQueryKeys.all,
      'detail',
      clientId,
      userId ?? null,
      role ?? null,
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

interface ClientQueryOptions {
  clientId: string | undefined;
  userId: string | undefined;
  role: UserRole | undefined;
  accessToken: string | null;
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

export function clientQueryOptions({
  clientId,
  userId,
  role,
  accessToken,
}: ClientQueryOptions) {
  return queryOptions({
    queryKey: clientsQueryKeys.detail(clientId ?? '', userId, role),
    queryFn: ({ signal }) => getClientById(clientId!, signal),
    staleTime: 30_000,
    enabled: Boolean(clientId && userId && accessToken && role),
    retry: false,
  });
}
