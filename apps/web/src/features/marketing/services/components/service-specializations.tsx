import { useLocale, useTranslations } from 'next-intl';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AppLocale, SpecializationDto } from '@autoservice/contracts';
import { Container, Section, SectionHeader } from '@/components/layout';
import { CardGrid, IconCard } from '@/components/common';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';

export interface ServiceSpecializationsProps {
  specializations: SpecializationDto[];
}

export default function ServiceSpecializations({
  specializations,
}: ServiceSpecializationsProps) {
  const t = useTranslations('services.servicePage.specialists');
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
          {specializations.map((specialization) => {
            const translation = specialization.translations[currentLocale];

            return (
              <IconCard
                key={specialization._id}
                icon={faCheck}
                title={translation.title}
                description={translation.description}
              />
            );
          })}
        </CardGrid>
      </Container>
    </Section>
  );
}
