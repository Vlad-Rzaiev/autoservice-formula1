'use client';

import { useAuth } from '@/providers';
import {
  DashboardQuickActions,
  DashboardOverview,
  useDashboardSummary,
} from '@/features/dashboard';
import {} from '@/features/dashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isPending, isError, isRefetching, refetch } =
    useDashboardSummary();

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    `user ${user?.userId}` ||
    '';

  return (
    <>
      <DashboardOverview
        displayName={displayName}
        isPending={isPending}
        isError={isError}
        data={data}
        refetch={refetch}
        isRefetching={isRefetching}
      />

      <DashboardQuickActions user={user} />
    </>
  );
}
