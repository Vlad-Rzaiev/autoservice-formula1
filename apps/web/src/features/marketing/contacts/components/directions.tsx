import { useTranslations } from 'next-intl';
import { contactsDirections } from '@/features/marketing/lib';

function Directions() {
  const t = useTranslations('marketing.contacts.directions');

  return (
    <div className="mt-8 border-t pt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{t('eyebrow')}</p>

        <h3 className="mt-1 text-xl font-semibold">{t('title')}</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {contactsDirections.map((direction, index) => (
          <div key={direction.key} className="flex gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background text-sm font-semibold">
              {index + 1}
            </span>

            <div>
              <p className="text-sm font-medium">
                {t(`steps.${direction.key}.title`)}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {t(`steps.${direction.key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Directions };
