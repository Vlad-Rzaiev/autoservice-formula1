import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { AppointmentDto, RepairDto } from '@autoservice/contracts';
import { ButtonLink } from '@/components/common';
import { Card, CardContent } from '@/components/ui';
import { ActivityError, EmptyActivity } from './dashboard-activity-states';
import { ActivityItem } from './dashboard-activity-item';
import { getActivityDate } from '../config/format-activity-date';

interface ActivityCardProps {
  kind: 'appointments' | 'repairs';
  items: AppointmentDto[] | RepairDto[];
  isPending: boolean;
  isError: boolean;
  isRefetching: boolean;
  onRetry: () => void;
  locale: string;
}

export function ActivityCard({
  kind,
  items,
  isPending,
  isError,
  isRefetching,
  onRetry,
  locale,
}: ActivityCardProps) {
  const t = useTranslations('dashboard.home.recent-activity');
  const isAppointments = kind === 'appointments';

  const href = isAppointments
    ? '/dashboard/appointments'
    : '/dashboard/repairs';

  return (
    <Card className="min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 pt-6">
        <div className="min-w-0">
          <h3 className="font-semibold tracking-tight">
            {isAppointments ? t('appointments') : t('repairs')}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{t('title')}</p>
        </div>

        {items.length >= 5 && (
          <ButtonLink href={href} variant="ctaOutline">
            {t('view-all')}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="size-3"
              aria-hidden="true"
            />
          </ButtonLink>
        )}
      </div>

      <CardContent className="pt-5">
        {isPending ? (
          <div className="space-y-3" aria-label={t('loading')}>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-19 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : isError ? (
          <ActivityError onRetry={onRetry} />
        ) : items.length === 0 ? (
          <EmptyActivity kind={kind} />
        ) : (
          <div className="space-y-3">
            {items.slice(0, 5).map((item) => {
              return (
                <ActivityItem
                  key={item._id}
                  kind={isAppointments ? 'appointment' : 'repair'}
                  title={item.title}
                  date={getActivityDate(kind, item)}
                  status={item.status}
                  locale={locale}
                />
              );
            })}
          </div>
        )}

        {isRefetching && (
          <p className="mt-3 text-xs text-muted-foreground" role="status">
            {t('loading')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
