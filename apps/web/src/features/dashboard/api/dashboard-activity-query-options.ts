import { queryOptions } from '@tanstack/react-query';
import { UserRole } from '@autoservice/contracts';
import { getDashboardAppointments } from './get-dashboard-appointments';
import { getDashboardRepairs } from './get-dashboard-repairs';

export const dashboardActivityQueryKeys = {
  all: ['dashboard', 'activity'] as const,

  appointments: (userId: string | undefined, role: UserRole | undefined) =>
    [
      ...dashboardActivityQueryKeys.all,
      'appointments',
      userId ?? null,
      role ?? null,
    ] as const,

  repairs: (userId: string | undefined, role: UserRole | undefined) =>
    [
      ...dashboardActivityQueryKeys.all,
      'repairs',
      userId ?? null,
      role ?? null,
    ] as const,
};

export function dashboardAppointmentsQueryOptions(
  userId: string | undefined,
  role: UserRole | undefined,
  accessToken: string | null,
) {
  return queryOptions({
    queryKey: dashboardActivityQueryKeys.appointments(userId, role),
    queryFn: ({ signal }) => getDashboardAppointments({ signal }),
    staleTime: 30_000,
    enabled: Boolean(userId && role && accessToken),
    retry: false,
  });
}

export function dashboardRepairsQueryOptions(
  userId: string | undefined,
  role: UserRole | undefined,
  accessToken: string | null,
) {
  return queryOptions({
    queryKey: dashboardActivityQueryKeys.repairs(userId, role),
    queryFn: ({ signal }) => getDashboardRepairs({ signal }),
    staleTime: 30_000,
    enabled: Boolean(userId && role && accessToken),
    retry: false,
  });
}
