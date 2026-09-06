import { CardGrid, IconItemCard } from '@/components/common';
import { Container, Section, SectionHeader } from '@/components/layout';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

export default function WarrantyConditions() {
  const t = useTranslations('warranty.conditions');

  const conditions = [
    t('items.completedByService'),
    t('items.approvedParts'),
    t('items.recommendations'),
    t('items.serviceIntervals'),
    t('items.proofOfWork'),
  ];

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          sectionTitle={t('title')}
          description={t('description')}
        />

        <CardGrid>
          {conditions.map((condition, index) => (
            <IconItemCard
              key={index}
              icon={faCircleCheck}
              iconWrapperClassName="bg-success/10 text-success"
            >
              {condition}
            </IconItemCard>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
}
