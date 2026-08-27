import { getTranslations } from 'next-intl/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Section, Container, SectionHeader } from '@/components/layout';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';

export default async function MarketingSpecialists() {
  const t = await getTranslations('marketing.specialists');

  return (
    <Section id="specialists">
      <Container>
        <SectionHeader
          sectionTitle={t('title')}
          description={t('description')}
        />
      </Container>

      <div className="flex justify-center">
        <ButtonLink href={routes.marketing.specialists} variant="iconSurface">
          {t('view-all')}

          <FontAwesomeIcon
            icon={faAngleRight}
            aria-hidden="true"
            className="text-lg transition-transform duration-200 group-hover:translate-x-1"
          />
        </ButtonLink>
      </div>
    </Section>
  );
}
