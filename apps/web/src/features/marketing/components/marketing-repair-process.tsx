import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionTitle } from '@/components/layout';

export default async function MarketingRepairProcess() {
  const t = await getTranslations();

  return (
    <Section id="repair-process">
      <Container>
        <SectionTitle>{t('marketing.repair-process.title')}</SectionTitle>
      </Container>
    </Section>
  );
}
