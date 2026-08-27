'use client';

import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { ButtonLink } from '@/components/common';
import { Section, Container, SectionHeader } from '@/components/layout';
import {
  useFeaturedServices,
  ServicesCatalog,
} from '@/features/marketing/services';
import { routes } from '@/config';

export default function MarketingServices() {
  const t = useTranslations();

  const {
    data: services = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useFeaturedServices();

  const hasLoadedServices = !isPending && !isError && services.length > 0;

  return (
    <Section id="services">
      <Container>
        <SectionHeader
          sectionTitle={t('marketing.services.title')}
          description={t('marketing.services.description')}
        />

        <ServicesCatalog
          services={services}
          isPending={isPending}
          isError={isError}
          isRefetching={isRefetching}
          refetch={refetch}
        />

        {hasLoadedServices && (
          <div className="mt-10 flex justify-center md:mt-12">
            <ButtonLink href={routes.marketing.services} variant="iconSurface">
              {t('marketing.services.view-all')}

              <FontAwesomeIcon
                icon={faAngleRight}
                aria-hidden="true"
                className="text-lg transition-transform duration-200 group-hover:translate-x-1"
              />
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
