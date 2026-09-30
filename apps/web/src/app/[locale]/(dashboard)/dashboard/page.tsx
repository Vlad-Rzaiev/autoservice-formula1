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
import { DashboardStatCard } from '@/features/dashboard';

export default function DashboardPage() {
  const t = useTranslations('dashboard.home');
  const { user } = useAuth();

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

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStatCard label={t('stats.cars')} value={0} icon={faCar} />

          <DashboardStatCard
            label={t('stats.appointments')}
            value={0}
            icon={faCalendarCheck}
          />

          <DashboardStatCard
            label={t('stats.repairs')}
            value={0}
            icon={faScrewdriverWrench}
          />

          <DashboardStatCard
            label={t('stats.completed')}
            value={0}
            icon={faCheckCircle}
          />
        </div>
      </Container>
    </Section>
  );
}
