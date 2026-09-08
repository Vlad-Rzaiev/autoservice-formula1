import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { workingHours } from '@/features/marketing/lib';

function WorkingHours() {
  const t = useTranslations('marketing.contacts.hours');

  return (
    <div className="flex gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <FontAwesomeIcon icon={faClock} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">{t('label')}</p>

        <div className="mt-3 space-y-1.5">
          {workingHours.map((workingHour) => {
            const isClosed = !workingHour.open || !workingHour.close;

            return (
              <div
                key={workingHour.day}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span>{t(`days.${workingHour.day}`)}</span>

                <span
                  className={isClosed ? 'text-muted-foreground' : 'font-medium'}
                >
                  {isClosed
                    ? t('closed')
                    : `${workingHour.open} — ${workingHour.close}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { WorkingHours };
