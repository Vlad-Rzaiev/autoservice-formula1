import { useTranslations } from 'next-intl';
import {
  faCalendarCheck,
  faRotateRight,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui';

export function EmptyActivity({ kind }: { kind: 'appointments' | 'repairs' }) {
  const t = useTranslations('dashboard.home.recent-activity');

  return (
    <div className="rounded-xl border border-dashed px-4 py-10 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <FontAwesomeIcon
          icon={kind === 'appointments' ? faCalendarCheck : faScrewdriverWrench}
          className="size-5"
          aria-hidden="true"
        />
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {kind === 'appointments' ? t('empty-appointments') : t('empty-repairs')}
      </p>
    </div>
  );
}

export function ActivityError({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations('dashboard.home.recent-activity');

  return (
    <div className="rounded-xl border border-dashed p-6 text-center">
      <p className="text-sm font-medium">{t('error')}</p>
      <p className="my-1 text-sm text-muted-foreground">
        {t('error-description')}
      </p>

      <Button
        type="button"
        onClick={onRetry}
        variant="iconSurface"
        className="cursor-pointer"
      >
        <FontAwesomeIcon icon={faRotateRight} aria-hidden="true" />
        {t('retry')}
      </Button>
    </div>
  );
}
