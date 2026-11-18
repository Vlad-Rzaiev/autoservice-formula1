import { queryOptions } from '@tanstack/react-query';
import type { UserRole } from '@autoservice/contracts';

import { getClientAppointments } from './get-client-appointments';
import { getClientRepairs } from './get-client-repairs';

export const clientHistoryQueryKeys = {
  all: ['client-history'] as const,

  repairs: (
    clientId: string,
    userId: string | undefined,
    role: UserRole | undefined,
    page: number,
    limit: number,
  ) =>
    [
      ...clientHistoryQueryKeys.all,
      'repairs',
      clientId,
      userId ?? null,
      role ?? null,
      page,
      limit,
    ] as const,

  appointments: (
    clientId: string,
    userId: string | undefined,
    role: UserRole | undefined,
    page: number,
    limit: number,
  ) =>
    [
      ...clientHistoryQueryKeys.all,
      'appointments',
      clientId,
      userId ?? null,
      role ?? null,
      page,
      limit,
    ] as const,
};

interface ClientHistoryQueryOptions {
  clientId: string;
  userId: string | undefined;
  role: UserRole | undefined;
  accessToken: string | null;
  page: number;
  limit: number;
}

export function clientRepairsQueryOptions({
  clientId,
  userId,
  role,
  accessToken,
  page,
  limit,
}: ClientHistoryQueryOptions) {
  return queryOptions({
    queryKey: clientHistoryQueryKeys.repairs(
      clientId,
      userId,
      role,
      page,
      limit,
    ),
    queryFn: ({ signal }) =>
      getClientRepairs({
        clientId,
        page,
        limit,
        signal,
      }),
    staleTime: 30_000,
    enabled: Boolean(
      clientId &&
      userId &&
      accessToken &&
      (role === 'owner' || role === 'manager'),
    ),
    retry: false,
  });
}

export function clientAppointmentsQueryOptions({
  clientId,
  userId,
  role,
  accessToken,
  page,
  limit,
}: ClientHistoryQueryOptions) {
  return queryOptions({
    queryKey: clientHistoryQueryKeys.appointments(
      clientId,
      userId,
      role,
      page,
      limit,
    ),
    queryFn: ({ signal }) =>
      getClientAppointments({
        clientId,
        page,
        limit,
        signal,
      }),
    staleTime: 30_000,
    enabled: Boolean(
      clientId &&
      userId &&
      accessToken &&
      (role === 'owner' || role === 'manager'),
    ),
    retry: false,
  });
}
