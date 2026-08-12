import { useTranslations } from 'next-intl';
import { Section, Container, SectionTitle } from '@/components/layout';

export default function MarketingDiagnostics() {
  const t = useTranslations();
  return (
    <Section id="diagnostics">
      <Container>
        <SectionTitle>{t('marketing.diagnostics.title')}</SectionTitle>
      </Container>
    </Section>
  );
}
