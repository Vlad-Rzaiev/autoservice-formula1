'use client';

import { useTranslations } from 'next-intl';
import {
  faCalendarCheck,
  faCar,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { QueryState } from '@/components/states';
import { CardGrid } from '@/components/common';
import { useDashboardSummary } from '../../api/use-dashboard-summary';
import DashboardStatsSkeleton from '../../components/dashboard-stats-skeleton';
import DashboardStatCard from '../../components/dashboard-stat-card';

export default function CarsStatCards() {
  const t = useTranslations('dashboard.home');
  const { data, isPending, isError, isRefetching, refetch } =
    useDashboardSummary();

  return (
    <div className="mt-8">
      <QueryState
        isPending={isPending || (!isError && !data)}
        isError={isError}
        loadingContent={<DashboardStatsSkeleton />}
        loadingMessage={t('loading-state.loading-title')}
        loadingDescription={t('loading-state.loading-description')}
        errorMessage={t('loading-state.error-title')}
        errorDescription={t('loading-state.error-description')}
        retryLabel={t('loading-state.retry')}
        onRetry={() => void refetch()}
        isRetrying={isRefetching}
      >
        {data && (
          <CardGrid columns="three">
            <DashboardStatCard
              label={t('stats.cars')}
              value={data!.carsCount}
              icon={faCar}
            />

            <DashboardStatCard
              label={t('stats.appointments')}
              value={data!.appointmentsCount}
              icon={faCalendarCheck}
            />

            <DashboardStatCard
              label={t('stats.repairs')}
              value={data!.activeRepairsCount}
              icon={faScrewdriverWrench}
            />
          </CardGrid>
        )}
      </QueryState>
    </div>
  );
}
