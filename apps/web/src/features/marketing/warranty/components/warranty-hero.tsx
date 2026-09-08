import { useTranslations } from 'next-intl';
import { Container, Section, SectionHeader } from '@/components/layout';
import { CardGrid, IconItemCard } from '@/components/common';
import { warrantyTrustItems } from '@/features/marketing/lib';

export default function WarrantyHero() {
  const t = useTranslations('warranty.hero');

  return (
    <Section className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(to_right,oklch(0.5_0_0/0.08)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0_0/0.08)_1px,transparent_1px)]
          bg-size-[32px_32px]
          dark:bg-[linear-gradient(to_right,oklch(1_0_0/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.06)_1px,transparent_1px)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-40 -top-40
          size-125 rounded-full
          bg-success/10 blur-3xl
        "
      />

      <Container className="relative">
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
