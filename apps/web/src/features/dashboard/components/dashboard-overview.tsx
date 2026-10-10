import { useTranslations } from 'next-intl';
import { DashboardSummaryDto } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { QueryState } from '@/components/states';
import DashboardStatsSkeleton from '@/features/dashboard/components/dashboard-stats-skeleton';
import DashboardStatCard from '@/features/dashboard/components/dashboard-stat-card';
import {
  faCalendarCheck,
  faCar,
  faCheckCircle,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';

export interface DashboardOverviewProps {
  displayName: string;
  isPending: boolean;
  isError: boolean;
  data: DashboardSummaryDto | undefined;
  refetch: () => Promise<unknown>;
  isRefetching: boolean;
}

export default function DashboardOverview({
  displayName,
  isPending,
  isError,
  data,
  refetch,
  isRefetching,
}: DashboardOverviewProps) {
  const t = useTranslations('dashboard.home');

  return (
    <Section>
      <Container>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {t('title', { name: displayName })}
          </h1>

          <p className="text-muted-foreground">{t('description')}</p>
        </div>

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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                <DashboardStatCard
                  label={t('stats.completed')}
                  value={data!.completedRepairsCount}
                  icon={faCheckCircle}
                />
              </div>
            )}
          </QueryState>
        </div>
      </Container>
    </Section>
  );
}
