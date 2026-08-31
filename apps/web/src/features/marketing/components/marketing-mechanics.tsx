'use client';

import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useFeaturesMechanics } from '../mechanics/api/use-mechanics';
import { Section, Container, SectionHeader } from '@/components/layout';
import SpecialistsCatalog from '../mechanics/components/mechanics-catalog';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';

export default function MarketingMechanics() {
  const t = useTranslations('marketing.specialists');

  const {
    data: mechanics = [],
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useFeaturesMechanics();

  const hasLoadedMechanics = !isPending && !isError && mechanics.length > 0;

  return (
    <Section id="specialists">
      <Container>
        <SectionHeader
          sectionTitle={t('title')}
          description={t('description')}
          subTitle={t('subTitle')}
        />

        <SpecialistsCatalog
          mechanics={mechanics}
          isPending={isPending}
          isError={isError}
          isRefetching={isRefetching}
          refetch={refetch}
        />

        {hasLoadedMechanics && (
          <div className="mt-10 flex justify-center md:mt-12">
            <ButtonLink href={routes.marketing.mechanics} variant="iconSurface">
              {t('view-all')}

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
