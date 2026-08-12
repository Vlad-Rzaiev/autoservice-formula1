import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionTitle } from '@/components/layout';

export default async function MarketingWarranty() {
  const t = await getTranslations();

  return (
    <Section id="warranty">
      <Container>
        <SectionTitle>{t('marketing.warranty.title')}</SectionTitle>
      </Container>
    </Section>
  );
}
