import { useTranslations } from 'next-intl';
import { Container, Section, SectionHeader } from '@/components/layout';
import { CardGrid, IconCard } from '@/components/common';
import { warrantyCoverageItems } from '@/features/marketing/lib/constants';

export default function WarrantyCoverage() {
  const t = useTranslations('warranty.coverage');

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          sectionTitle={t('title')}
          description={t('description')}
        />

        <CardGrid columns="four">
          {warrantyCoverageItems.map((item) => (
            <IconCard
              key={item.id}
              icon={item.icon}
              title={t(item.title)}
              description={t(item.description)}
              iconWrapperClassName="bg-success/10 text-success"
              className="transition-all duration-300 hover:-translate-y-0.5 hover:border-success/50 hover:shadow-sm"
            />
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
}
