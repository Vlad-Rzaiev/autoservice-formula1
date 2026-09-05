import { IconItemCard } from '@/components/common';
import { Container, Section, SectionHeader } from '@/components/layout';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

export default function ServiceBenefits() {
  const t = useTranslations('services.servicePage.benefits');
  return (
    <Section>
      <Container>
        <SectionHeader sectionTitle={t('title')} />

        <div className="grid gap-4 md:grid-cols-2">
          {['diagnostics', 'specialists', 'equipment', 'transparency'].map(
            (benefitKey) => (
              <IconItemCard icon={faCheck} key={benefitKey}>
                {t(`${benefitKey}`)}
              </IconItemCard>
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}
