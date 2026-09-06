import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionTitle } from '@/components/layout';
import WarrantyStandards from './warranty/components/warranty-standards';

export default async function MarketingWarranty() {
  const t = await getTranslations('marketing.warranty');

  return (
    <Section id="warranty">
      <Container>
        <SectionTitle className="mb-10 md:mb-12 lg:mb-14">
          {t('title')}
        </SectionTitle>

        <WarrantyStandards />
      </Container>
    </Section>
  );
}
