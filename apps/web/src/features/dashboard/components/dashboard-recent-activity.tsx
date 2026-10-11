'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { useDashboardActivity } from '../api/use-dashboard-activity';
import { ActivityCard } from './dashboard-activity-card';

export default function DashboardRecentActivity() {
  const t = useTranslations('dashboard.home.recent-activity');
  const locale = useLocale();

  const { appointmentsQuery, repairsQuery } = useDashboardActivity();

  return (
    <Section>
      <Container>
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">{t('title')}</h2>

          {appointmentsQuery.isPending || repairsQuery.isPending ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {t('loading-description')}
            </p>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              {t('description')}
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityCard
            kind="appointments"
            items={appointmentsQuery.data ?? []}
            isPending={appointmentsQuery.isPending}
            isError={appointmentsQuery.isError}
            isRefetching={appointmentsQuery.isRefetching}
            onRetry={() => void appointmentsQuery.refetch()}
            locale={locale}
          />

          <ActivityCard
            kind="repairs"
            items={repairsQuery.data ?? []}
            isPending={repairsQuery.isPending}
            isError={repairsQuery.isError}
            isRefetching={repairsQuery.isRefetching}
            onRetry={() => void repairsQuery.refetch()}
            locale={locale}
          />
        </div>
      </Container>
    </Section>
  );
}
