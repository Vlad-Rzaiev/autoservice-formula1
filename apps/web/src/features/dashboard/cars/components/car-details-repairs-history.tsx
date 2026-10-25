'use client';

import { useLocale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@/i18n/navigation';
import { routes } from '@/config';
import { Container, Section } from '@/components/layout';
import { QueryState } from '@/components/states';
import { useCarRepairHistory } from '../api/use-car-repair-history';
import { getActivityDate } from '../../config/format-activity-date';
import { ActivityItem } from '../../components/dashboard-activity-item';

interface CarDetailsRepairsHistoryProps {
  carId: string;
}

export default function CarDetailsRepairsHistory({
  carId,
}: CarDetailsRepairsHistoryProps) {
  const t = useTranslations('dashboard.car.repair-history');
  const locale = useLocale();

  const {
    data: repairs,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useCarRepairHistory(carId);

  return (
    <Section>
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {t('title')}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('description')}
            </p>
          </div>

          {repairs && repairs.length > 0 && (
            <Link
              href={routes.dashboard.cars.repairs(carId)}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:opacity-80"
            >
              {t('view-all')}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="size-3"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>

        <QueryState
          isPending={isPending}
          isError={isError}
          isEmpty={!repairs?.length}
          loadingMessage={t('loading-title')}
          loadingDescription={t('loading-description')}
          errorMessage={t('error-title')}
          errorDescription={t('error-description')}
          retryLabel={t('retry')}
          isRetrying={isFetching}
          onRetry={() => void refetch()}
          emptyMessage={t('empty-title')}
          emptyDescription={t('empty-description')}
          emptyIcon={faScrewdriverWrench}
        >
          <div className="space-y-3">
            {repairs?.map((repair) => (
              <Link
                key={repair._id}
                href={routes.dashboard.repairs.detail(repair._id)}
                className="block rounded-xl transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ActivityItem
                  kind="repair"
                  title={repair.title}
                  date={getActivityDate('repairs', repair)}
                  status={repair.status}
                  locale={locale}
                />
              </Link>
            ))}
          </div>
        </QueryState>
      </Container>
    </Section>
  );
}
