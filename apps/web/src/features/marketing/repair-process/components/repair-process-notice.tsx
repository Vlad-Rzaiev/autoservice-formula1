import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

export default function RepairProcessNotice() {
  const t = useTranslations('marketing.repair-process.notice');

  return (
    <div className="mx-auto mt-4 max-w-3xl">
      <div className="flex gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 md:p-6">
        <div
          className="
            flex
            size-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-primary/10
            text-primary
          "
        >
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="size-5"
            aria-hidden="true"
          />
        </div>

        <div>
          <h3 className="font-semibold">{t('title')}</h3>

          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </div>
    </div>
  );
}
