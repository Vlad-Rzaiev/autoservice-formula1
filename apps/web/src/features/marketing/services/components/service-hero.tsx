import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCalendarCheck,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import { getTranslations } from 'next-intl/server';
import { cn, defaultIcon, iconMap } from '@/lib';
import { routes, siteConfig } from '@/config';
import { IconKey } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { ButtonLink } from '@/components/common';
import { buttonVariants } from '@/components/ui';

export interface ServiceHeroProps {
  icon: IconKey;
  title: string;
  description: string;
}

export default async function ServiceHero({
  icon,
  title,
  description,
}: ServiceHeroProps) {
  const t = await getTranslations('services.servicePage');

  const serviceIcon = iconMap[icon] ?? defaultIcon;

  return (
    <Section noTopPadding className="relative">
      <div
        aria-hidden="true"
        className="
          absolute right-0 top-0 size-96
          rounded-full bg-red-600/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute bottom-0 left-0 size-96
          rounded-full bg-red-600/5 blur-3xl
        "
      />
      <Container className="relative pt-10">
        <ButtonLink
          href={routes.marketing.services}
          variant="link"
          className="absolute -top-2 px-0 text-muted-foreground hover:text-foreground"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          {t('back-to-services')}
        </ButtonLink>
        <div
          className="
            grid items-center gap-12
            lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]
            lg:gap-16
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                border border-red-500/20 bg-red-500/10
                px-4 py-2 text-sm font-semibold text-red-600
                dark:text-red-400
              "
            >
              <FontAwesomeIcon
                icon={serviceIcon}
                aria-hidden="true"
                className="shrink-0"
              />

              {t('hero.eyebrow')}
            </div>

            <h1
              className="
                mt-6 text-4xl font-bold tracking-tight
                text-foreground sm:text-5xl lg:text-6xl
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-6 max-w-2xl text-base leading-7
                text-muted-foreground
                sm:text-lg sm:leading-8
              "
            >
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={routes.marketing.booking}
                variant="ctaPrimary"
                size="cta"
              >
                <FontAwesomeIcon icon={faCalendarCheck} aria-hidden="true" />

                {t('hero.booking')}
              </ButtonLink>

              <a
                href={siteConfig.phone.href}
                className={cn(
                  buttonVariants({
                    variant: 'ctaOutline',
                    size: 'cta',
                  }),
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

                {t('hero.call')}
              </a>
            </div>
          </div>

          <div
            className="
              relative flex min-h-80 items-center justify-center
              overflow-hidden rounded-3xl
              border border-red-500/15 bg-red-500/5
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute size-64 rounded-full
                border border-red-500/10
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute size-44 rounded-full
                border border-red-500/20
              "
            />

            <div
              className="
                relative flex size-28 items-center justify-center
                rounded-3xl bg-red-600
                text-white
                shadow-[0_25px_60px_-20px_rgba(220,38,38,0.9)]
              "
            >
              <FontAwesomeIcon
                icon={serviceIcon}
                className="text-5xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
