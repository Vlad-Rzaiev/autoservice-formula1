import { useTranslations } from 'next-intl';
import { cardsItems } from '@/features/marketing';
import { Section, Container, SectionHeader } from '@/components/layout';
import { IconCard, CardGrid } from '@/components/common';

export default function MarketingWhyUs() {
  const t = useTranslations();

  return (
    <Section id="why-us">
      <Container>
        <SectionHeader
          className="mb-8 lg:mb-12"
          sectionTitle={t('marketing.why-us.title')}
        />

        <CardGrid columns="four">
          {cardsItems.map((item) => (
            <li key={item.id}>
              <IconCard
                icon={item.icon}
                title={t(item.title)}
                description={t(item.description)}
                className="
                  transition-all duration-300
                  hover:-translate-y-1 hover:border-red-500/30
                  hover:shadow-lg
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              />
            </li>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
}
