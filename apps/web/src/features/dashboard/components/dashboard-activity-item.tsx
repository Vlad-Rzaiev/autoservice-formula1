import { useTranslations } from 'next-intl';
import {
  faCalendarCheck,
  faClock,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatActivityDate } from '../config/format-activity-date';
import { ButtonLink, StatusBadge } from '@/components/common';
import { routes } from '@/config';

type ActivityStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'accepted'
  | 'waiting_parts'
  | 'awaiting_approval';

type ActivityKind = 'appointment' | 'repair';

const supportedStatuses: ActivityStatus[] = [
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show',
  'accepted',
  'waiting_parts',
  'awaiting_approval',
];

interface ActivityItemProps {
  id: string;
  title: string;
  date: string;
  status: string;
  kind: ActivityKind;
  locale: string;
  clientId: string;
  carId: string;
}

export function ActivityItem({
  id,
  title,
  date,
  status,
  kind,
  locale,
  clientId,
  carId,
}: ActivityItemProps) {
  const t = useTranslations('dashboard.home.recent-activity');

  const statusKey = supportedStatuses.find(
    (supportedStatus) => supportedStatus === status,
  );

  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-xl border border-border/70 p-3 transition-colors hover:bg-muted/40">
      <div className="min-w-0 sm:hidden">
        <StatusBadge
          status={status}
          label={statusKey ? t(`status.${statusKey}`) : status}
        />
      </div>

      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FontAwesomeIcon
              icon={
                kind === 'appointment' ? faCalendarCheck : faScrewdriverWrench
              }
              className="size-4"
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="wrap-break-words text-sm font-semibold">{title}</p>

            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <FontAwesomeIcon
                icon={faClock}
                className="size-3 shrink-0"
                aria-hidden="true"
              />
              <time dateTime={date}>{formatActivityDate(date, locale)}</time>
            </p>
          </div>
        </div>

        <div className="hidden max-w-[45%] shrink-0 sm:block">
          <StatusBadge
            status={status}
            label={statusKey ? t(`status.${statusKey}`) : status}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <ButtonLink
          href={
            kind === 'appointment'
              ? routes.dashboard.appointments.detail(id)
              : routes.dashboard.repairs.detail(id)
          }
          variant="outline"
          size="sm"
          className="h-8 max-w-full px-3 text-xs"
        >
          {t(kind === 'appointment' ? 'to-appointment' : 'to-repair')}
        </ButtonLink>

        <ButtonLink
          href={routes.dashboard.clients.detail(clientId)}
          variant="outline"
          size="sm"
          className="h-8 max-w-full px-3 text-xs"
        >
          {t('to-client')}
        </ButtonLink>

        <ButtonLink
          href={routes.dashboard.cars.detail(carId)}
          variant="outline"
          size="sm"
          className="h-8 max-w-full px-3 text-xs"
        >
          {t('to-car')}
        </ButtonLink>
      </div>
    </div>
  );
}
