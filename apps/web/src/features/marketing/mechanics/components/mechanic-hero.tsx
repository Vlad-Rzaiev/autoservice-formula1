import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container, Section } from '@/components/layout';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';

export interface MechanicHeroProps {
  photoUrl: string | null;
  fullName: string;
  description: string | undefined;
  experienceYears: number;
}

export default function MechanicHero({
  photoUrl,
  fullName,
  description,
  experienceYears,
}: MechanicHeroProps) {
  const t = useTranslations('marketing.specialists.mechanic');
  const nameInitials = fullName
    .trim()
    .split(' ')
    .map((namePart) => namePart[0])
    .join('');

  return (
    <Section>
      <Container className="relative">
        <ButtonLink
          href={routes.marketing.mechanics}
          variant="link"
          className="absolute -top-20 px-0 text-muted-foreground hover:text-foreground"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />

          {t('view-all')}
        </ButtonLink>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative min-h-80 overflow-hidden rounded-3xl bg-muted md:min-h-125">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={fullName}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="eager"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-6xl font-semibold text-muted-foreground">
                {nameInitials}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="mb-3 text-sm font-medium uppercase tracking-wider text-success">
              {t('profile')}
            </span>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {fullName}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {description}
            </p>

            <p>
              {t('yearsOfExperience', {
                years: experienceYears,
              })}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink
            href={routes.marketing.booking}
            variant="destructive"
            className="gap-2"
          >
            <span className="flex items-center">
              <FontAwesomeIcon
                icon={faChevronRight}
                aria-hidden="true"
                className="animate-[arrow-right-outer_1.2s_ease-in-out_infinite]"
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                aria-hidden="true"
                className="-ml-1 animate-[arrow-right-middle_1.2s_ease-in-out_infinite]"
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                aria-hidden="true"
                className="-ml-1 animate-[arrow-right-inner_1.2s_ease-in-out_infinite]"
              />
            </span>

            <span>{t('booking')}</span>

            <span className="flex items-center">
              <FontAwesomeIcon
                icon={faChevronLeft}
                aria-hidden="true"
                className="animate-[arrow-left-outer_1.2s_ease-in-out_infinite]"
              />
              <FontAwesomeIcon
                icon={faChevronLeft}
                aria-hidden="true"
                className="-ml-1 animate-[arrow-left-middle_1.2s_ease-in-out_infinite]"
              />
              <FontAwesomeIcon
                icon={faChevronLeft}
                aria-hidden="true"
                className="-ml-1 animate-[arrow-left-inner_1.2s_ease-in-out_infinite]"
              />
            </span>
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
