import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/providers';
import {
  dashboardAppointmentsQueryOptions,
  dashboardRepairsQueryOptions,
} from './dashboard-activity-query-options';

export function useDashboardActivity() {
  const { user, accessToken } = useAuth();

  const appointmentsQuery = useQuery(
    dashboardAppointmentsQueryOptions(user?.userId, user?.role, accessToken),
  );

  const repairsQuery = useQuery(
    dashboardRepairsQueryOptions(user?.userId, user?.role, accessToken),
  );

  return {
    appointmentsQuery,
    repairsQuery,
  };
}
