import { useTranslations } from 'next-intl';
import { Section, Container, SectionHeader } from '@/components/layout';
import DiagnosticsSteps from './diagnostics-steps';
import DiagnosticsCheck from './diagnostics-check';
import DiagnosticsWhy from './diagnostics-why';
import DiagnosticsCta from './diagnostics-cta';

export default function MarketingDiagnostics() {
  const t = useTranslations('marketing.diagnostics');

  return (
    <Section id="diagnostics">
      <Container>
        <SectionHeader
          className="mb-10 md:mb-12 lg:mb-14"
          sectionTitle={t('title')}
          description={t('description')}
        />

        <DiagnosticsSteps />

        <DiagnosticsCheck />

        <DiagnosticsWhy />

        <DiagnosticsCta />
      </Container>
    </Section>
  );
}
