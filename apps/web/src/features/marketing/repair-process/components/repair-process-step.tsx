import { useTranslations } from 'next-intl';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface RepairProcessStepProps {
  number: string;
  icon: IconDefinition;
  translationKey:
    | 'booking'
    | 'acceptance'
    | 'diagnostics'
    | 'estimate'
    | 'repair'
    | 'qualityControl'
    | 'delivery';
  reverse?: boolean;
}

export default function RepairProcessStep({
  number,
  icon,
  translationKey,
  reverse = false,
}: RepairProcessStepProps) {
  const t = useTranslations('marketing.repair-process.steps');
  return (
    <li
      className={`
        relative
        grid
        grid-cols-[40px_1fr]
        gap-5
        md:grid-cols-[1fr_72px_1fr]
        md:gap-8
        ${reverse ? 'md:[&>div:last-child]:col-start-1 md:[&>div:last-child]:row-start-1 md:[&>div:last-child]:text-right' : ''}
      `}
    >
      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold md:col-start-2 md:size-14">
        <FontAwesomeIcon icon={icon} className="size-5" aria-hidden="true" />
      </div>

      <div
        className={
          reverse
            ? 'pb-10 md:col-start-1 md:row-start-1 md:pb-16 md:text-right'
            : 'pb-10 md:col-start-3 md:row-start-1 md:pb-16'
        }
      >
        <span className="mb-2 block text-sm font-semibold text-primary">
          {number}
        </span>

        <h3 className="text-xl font-semibold tracking-tight">
          {t(`${translationKey}.title`)}
        </h3>

        <p className="mt-2 max-w-lg text-muted-foreground">
          {t(`${translationKey}.description`)}
        </p>
      </div>
    </li>
  );
}
