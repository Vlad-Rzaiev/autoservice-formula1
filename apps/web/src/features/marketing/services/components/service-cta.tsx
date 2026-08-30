import { ButtonLink } from '@/components/common';
import { Container, Section } from '@/components/layout';
import { buttonVariants } from '@/components/ui';
import { routes, siteConfig } from '@/config';
import { cn } from '@/lib';
import {
  faCalendarCheck,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

export default function ServiceCta() {
  const t = useTranslations('services.servicePage.cta');
  return (
    <Section>
      <Container>
        <div
          className="
              relative overflow-hidden
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

          <div className="relative max-w-3xl">
            <p
              className="
                  text-sm font-semibold
                  uppercase tracking-wider
                  text-red-400
                "
            >
              {t('eyebrow')}
            </p>

            <h2
              className="
                  mt-4 text-3xl font-bold
                  sm:text-4xl
                "
            >
              {t('title')}
            </h2>

            <p
              className="
                  mt-5 text-base leading-7
                  text-neutral-300
                  sm:text-lg
                "
            >
              {t('description')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={routes.marketing.booking}
                variant="ctaPrimary"
                className="w-full sm:w-auto"
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  aria-hidden="true"
                  className="shrink-0 text-base"
                />

                {t('booking')}
              </ButtonLink>

              <a
                href={siteConfig.phone.href}
                className={cn(
                  buttonVariants({
                    variant: 'ctaOutline',
                    size: 'cta-lg',
                  }),
                  'w-full sm:w-auto',
                )}
              >
                <FontAwesomeIcon
                  icon={faPhoneVolume}
                  aria-hidden="true"
                  className="
                    shrink-0 text-base
                    animate-phone-ring
                    motion-reduce:animate-none
                  "
                />

                {t('call')}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
