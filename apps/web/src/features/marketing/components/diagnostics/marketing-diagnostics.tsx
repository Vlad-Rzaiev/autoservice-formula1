import { Section, Container } from '@/components/layout';
import DiagnosticsTitle from './diagnostics-title';
import DiagnosticsSteps from './diagnostics-steps';
import DiagnosticsCheck from './diagnostics-check';
import DiagnosticsWhy from './diagnostics-why';
import DiagnosticsCta from './diagnostics-cta';

export default function MarketingDiagnostics() {
  return (
    <Section id="diagnostics">
      <Container>
        <DiagnosticsTitle />

        <DiagnosticsSteps />

        <DiagnosticsCheck />

        <DiagnosticsWhy />

        <DiagnosticsCta />
      </Container>
    </Section>
  );
}
