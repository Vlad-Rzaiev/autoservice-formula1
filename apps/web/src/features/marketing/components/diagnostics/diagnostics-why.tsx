import { useTranslations } from 'next-intl';
import { CardGrid } from '@/components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { diagnosticsBenefits } from './diagnostics-benefits';

export default function DiagnosticsWhy() {
  const t = useTranslations('marketing.diagnostics');

  return (
    <div
      className="
        my-12 grid gap-8
        rounded-3xl
        border border-border
        bg-background
        p-6
        sm:p-8
        lg:grid-cols-[0.8fr_1.2fr]
        lg:p-10
    "
    >
      <div>
        <span
          className="
            text-sm font-semibold uppercase
            tracking-wider text-red-500
        "
        >
          {t('benefits.eyebrow')}
        </span>

        <h3
          className="
            mt-3 text-2xl font-bold tracking-tight
            text-foreground sm:text-3xl
        "
        >
          {t('benefits.title')}
        </h3>
      </div>

      <CardGrid columns="one">
        {diagnosticsBenefits.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <span
              className="
                flex size-10 shrink-0 items-center justify-center
                rounded-xl bg-red-500/10 text-red-600
                dark:text-red-400
            "
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="h-5 w-5"
                aria-hidden="true"
              />
            </span>

            <div>
              <h4 className="font-semibold text-foreground">{t(item.title)}</h4>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {t(item.description)}
              </p>
            </div>
          </li>
        ))}
      </CardGrid>
    </div>
  );
}
