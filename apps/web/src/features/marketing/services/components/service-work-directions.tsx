import { useLocale, useTranslations } from 'next-intl';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { AppLocale, WorkDirectionDto } from '@autoservice/contracts';
import { Container, Section, SectionHeader } from '@/components/layout';
import { CardGrid, IconCard } from '@/components/common';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

export interface ServiceWorkDirectionsProps {
  workDirections: WorkDirectionDto[];
}

export default function ServiceWorkDirections({
  workDirections,
}: ServiceWorkDirectionsProps) {
  const t = useTranslations('services.servicePage.directions');
  const locale = useLocale();

  const currentLocale: AppLocale = isAppLocale(locale) ? locale : defaultLocale;

  return (
    <Section>
      <Container>
        <SectionHeader
          sectionTitle={t('title')}
          description={t('description')}
        />

        <CardGrid columns="three" gap="large">
          {workDirections.map((workDirection) => {
            const translation = workDirection.translations[currentLocale];

            return (
              <IconCard
                key={workDirection._id}
                icon={faScrewdriverWrench}
                title={translation.title}
              />
            );
          })}
        </CardGrid>
      </Container>
    </Section>
  );
}
