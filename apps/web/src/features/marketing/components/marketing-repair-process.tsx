import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionTitle } from '@/components/layout';
import RepairProcessTimeline from '../repair-process/components/repair-process-timeline';
import RepairProcessNotice from '../repair-process/components/repair-process-notice';

export default async function MarketingRepairProcess() {
  const t = await getTranslations();

  return (
    <Section id="repair-process">
      <Container>
        <SectionTitle className="mb-10 md:mb-12 lg:mb-14">
          {t('marketing.repair-process.title')}
        </SectionTitle>

        <RepairProcessTimeline />

        <RepairProcessNotice />
      </Container>
    </Section>
  );
}
