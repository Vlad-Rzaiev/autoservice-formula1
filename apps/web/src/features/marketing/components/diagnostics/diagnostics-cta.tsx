import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { routes } from '@/config';
import { ButtonLink } from '@/components/common';

export default function DiagnosticsCta() {
  const t = useTranslations('marketing.diagnostics');

  return (
    <div
      className="
        relative mt-12 overflow-hidden
        rounded-3xl
        bg-neutral-950
        px-6 py-10 text-white
        shadow-[0_30px_80px_-40px_rgba(220,38,38,0.65)]
        sm:px-10 sm:py-12
        lg:px-14 lg:py-14
      "
    >
      <div
        aria-hidden="true"
        className="
      absolute -right-24 -top-28 size-80
      rounded-full bg-red-600/25 blur-3xl
    "
      />

      <div
        aria-hidden="true"
        className="
          absolute -bottom-32 left-1/3 size-72
          rounded-full bg-red-600/10 blur-3xl
        "
      />

      <div
        className="
          relative flex flex-col gap-7
          lg:flex-row lg:items-center
          lg:justify-between
        "
      >
        <div className="max-w-2xl">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t('cta.title')}
          </h3>

          <p className="mt-3 text-base leading-7 text-neutral-300">
            {t('cta.description')}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink href={routes.marketing.booking}>
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="h-4 w-4"
              aria-hidden="true"
            />

            {t('cta.booking')}
          </ButtonLink>

          <ButtonLink href={routes.marketing.services} variant="ctaOutline">
            {t('cta.services')}

            <FontAwesomeIcon
              icon={faArrowRight}
              className="h-4 w-4"
              aria-hidden="true"
            />
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
