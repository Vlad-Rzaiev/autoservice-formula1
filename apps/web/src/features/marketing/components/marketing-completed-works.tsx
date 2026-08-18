import { useTranslations } from 'next-intl';
import { Section, Container, SectionHeader } from '@/components/layout';

export default function MarketingCompletedWorks() {
  const t = useTranslations('marketing.completed-works');

  return (
    <Section id="completed-works">
      <Container>
        <SectionHeader
          sectionTitle={t('title')}
          description={t('description')}
        />
      </Container>
    </Section>
  );
}
