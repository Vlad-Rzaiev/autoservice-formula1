import { CardGrid, IconItemCard } from '@/components/common';
import { Container, Section, SectionTitle } from '@/components/layout';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { WorkDirectionDto } from '@autoservice/contracts';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useLocale, useTranslations } from 'next-intl';

export interface MechanicWorkDirectionsProps {
  workDirections: WorkDirectionDto[];
}

export default function MechanicWorkDirections({
  workDirections,
}: MechanicWorkDirectionsProps) {
  const t = useTranslations('marketing.specialists.mechanic');
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;

  return (
    <Section>
      <Container>
        <SectionTitle className="mb-5 md:mb-8 lg:mb-10">
          {t('workDirection')}
        </SectionTitle>

        <CardGrid>
          {workDirections.map((workDirection) => {
            const translation = workDirection.translations[currentLocale];

            return (
              <li key={workDirection._id}>
                <IconItemCard icon={faScrewdriverWrench}>
                  {translation.title}
                </IconItemCard>
              </li>
            );
          })}
        </CardGrid>
      </Container>
    </Section>
  );
}
