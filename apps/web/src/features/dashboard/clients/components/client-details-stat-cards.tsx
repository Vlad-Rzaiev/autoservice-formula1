'use client';

import {
  faCalendarCheck,
  faCar,
  faCheckToSlot,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { DashboardStatCard, useDashboardSummary } from '@/features/dashboard';
import { CardGrid } from '@/components/common';

interface ClientStatCardsProps {
  clientId: string;
}

export default function ClientStatCards({ clientId }: ClientStatCardsProps) {
  const t = useTranslations('clients.client-page.stats');

  const { data } = useDashboardSummary(clientId);

  return (
    <Section noTopPadding>
      <Container>
        {data && (
          <CardGrid columns="four">
            <DashboardStatCard
              label={t('cars')}
              value={data!.carsCount}
              icon={faCar}
            />

            <DashboardStatCard
              label={t('appointments')}
              value={data!.appointmentsCount}
              icon={faCalendarCheck}
            />

            <DashboardStatCard
              label={t('repairs')}
              value={data!.activeRepairsCount}
              icon={faTools}
            />

            <DashboardStatCard
              label={t('completed')}
              value={data!.completedRepairsCount}
              icon={faCheckToSlot}
            />
          </CardGrid>
        )}
      </Container>
    </Section>
  );
}
