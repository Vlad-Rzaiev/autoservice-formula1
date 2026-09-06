import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import { warrantyStandards } from '@/features/marketing/lib';
import { Description } from '@/components/layout';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { ButtonLink, IconCard } from '@/components/common';
import { routes } from '@/config';

export default function WarrantyStandards() {
  const t = useTranslations('marketing.warranty');

  return (
    <>
      <Description
        eyebrow={t('warranty.eyebrow')}
        title={t('warranty.title')}
        description={t('warranty.description')}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {warrantyStandards.map((standard) => (
          <IconCard
            key={standard.id}
            icon={standard.icon}
            title={t(standard.title)}
            description={t(standard.description)}
            iconWrapperClassName="bg-success/10 text-success"
            className="transition-all duration-300 hover:-translate-y-0.5 hover:border-success/50 hover:shadow-sm"
          />
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-success/30 bg-success/5 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-success text-success-foreground">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="size-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {t('warranty.guarantee.title')}
              </h3>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                {t('warranty.guarantee.description')}
              </p>
            </div>
          </div>

          <ButtonLink
            href={routes.marketing.warranty}
            variant="outline"
            className="shrink-0"
          >
            {t('warranty.guarantee.link')}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
