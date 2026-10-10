'use client';

import {
  faCalendarCheck,
  faCar,
  faCheckCircle,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/providers';
import { Section, Container } from '@/components/layout';
import { DashboardStatCard, useDashboardSummary } from '@/features/dashboard';
import { QueryState } from '@/components/states';

export default function DashboardPage() {
  const t = useTranslations('dashboard.home');
  const { user } = useAuth();
  const { data, isPending, isError, isRefetching, refetch } =
    useDashboardSummary();

  const hasData = data !== undefined;

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    `user ${user?.userId}` ||
    '';

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
            isPending={isPending || (!isError && !hasData)}
            isError={isError}
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
