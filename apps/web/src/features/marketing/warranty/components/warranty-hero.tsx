import { useTranslations } from 'next-intl';
import { Container, Section, SectionHeader } from '@/components/layout';
import { CardGrid, IconItemCard } from '@/components/common';
import { warrantyTrustItems } from '@/features/marketing/lib';

export default function WarrantyHero() {
  const t = useTranslations('warranty.hero');

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          sectionTitle={t('title')}
          description={t('description')}
        />

        <CardGrid columns="four">
          {warrantyTrustItems.map((item) => (
            <IconItemCard key={item.id} icon={item.icon}>
              {t(item.translationKey)}
            </IconItemCard>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
}
