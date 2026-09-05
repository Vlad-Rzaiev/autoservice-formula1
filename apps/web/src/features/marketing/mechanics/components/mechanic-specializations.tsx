import { CardGrid, IconItemCard } from '@/components/common';
import { Container, Section, SectionTitle } from '@/components/layout';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { SpecializationDto } from '@autoservice/contracts';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { useLocale, useTranslations } from 'next-intl';

export interface MechanicSpecializationsProps {
  specializations: SpecializationDto[];
}

export default function MechanicSpecializations({
  specializations,
}: MechanicSpecializationsProps) {
  const t = useTranslations('marketing.specialists.mechanic');
  const locale = useLocale();
  const currentLocale = isAppLocale(locale) ? locale : defaultLocale;

  return (
    <Section>
      <Container>
        <SectionTitle className="mb-5 md:mb-8 lg:mb-10">
          {t('specialization')}
        </SectionTitle>

        <CardGrid>
          {specializations.map((specialization) => {
            const translation = specialization.translations[currentLocale];

            return (
              <li key={specialization._id}>
                <IconItemCard
                  icon={faWrench}
                  description={translation.description}
                >
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
