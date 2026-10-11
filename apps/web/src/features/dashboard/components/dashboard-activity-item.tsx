import { useTranslations } from 'next-intl';
import {
  faCalendarCheck,
  faClock,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatActivityDate } from '../config/format-activity-date';
import { getStatusClassName } from '../config/get-activity-status';

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
  title: string;
  date: string;
  status: string;
  kind: ActivityKind;
  locale: string;
}

export function ActivityItem({
  title,
  date,
  status,
  kind,
  locale,
}: ActivityItemProps) {
  const t = useTranslations('dashboard.home.recent-activity');

  const statusKey = supportedStatuses.find(
    (supportedStatus) => supportedStatus === status,
  );

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/70 p-4 transition-colors hover:bg-muted/40">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FontAwesomeIcon
          icon={kind === 'appointment' ? faCalendarCheck : faScrewdriverWrench}
          className="size-4"
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <FontAwesomeIcon
            icon={faClock}
            className="size-3"
            aria-hidden="true"
          />
          <time dateTime={date}>{formatActivityDate(date, locale)}</time>
        </p>
      </div>

      <span
        className={`max-w-36 shrink-0 wrap-break-word rounded-full px-2.5 py-1 text-center text-xs font-medium ${getStatusClassName(status)}`}
      >
        {statusKey ? t(`status.${statusKey}`) : status}
      </span>
    </div>
  );
}
