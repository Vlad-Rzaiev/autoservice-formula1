import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardGrid } from '@/components/common';
import { systems } from './diagnostics-systems';

export default function DiagnosticsCheck() {
  const t = useTranslations('marketing.diagnostics');
  return (
    <div
      className="
    mt-12 rounded-3xl
    border border-border
    bg-surface
    p-6 shadow-sm
    sm:p-8
  "
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          {t('systems.title')}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t('systems.description')}
        </p>
      </div>

      <CardGrid columns="four" className="mt-6 gap-3">
        {systems.map((system) => (
          <li
            key={system.key}
            className="
              group flex items-center gap-3
              rounded-xl border border-border
              bg-background px-4 py-3
              transition-all duration-200
              hover:border-red-500/30
              hover:bg-red-500/5
            "
          >
            <span
              className="
                flex size-8 shrink-0 items-center justify-center
                rounded-lg bg-red-500/10
                text-red-600
                dark:text-red-400
              "
            >
              <FontAwesomeIcon
                icon={system.icon}
                className="h-4 w-4"
                aria-hidden="true"
              />
            </span>

            <span className="text-sm font-medium text-foreground">
              {t(system.translationKey)}
            </span>
          </li>
        ))}
      </CardGrid>
    </div>
  );
}
