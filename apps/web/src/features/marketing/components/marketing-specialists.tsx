import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionTitle } from '@/components/layout';

export default async function MarketingSpecialists() {
  const t = await getTranslations();

  return (
    <Section id="specialists">
      <Container>
        <SectionTitle>{t('marketing.specialists.title')}</SectionTitle>
      </Container>
    </Section>
  );
}
