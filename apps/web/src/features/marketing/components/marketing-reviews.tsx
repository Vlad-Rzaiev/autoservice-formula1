import { getTranslations } from 'next-intl/server';
import { Section, Container, SectionTitle } from '@/components/layout';

export default async function MarketingReviews() {
  const t = await getTranslations();

  return (
    <Section id="reviews">
      <Container>
        <SectionTitle>{t('marketing.reviews.title')}</SectionTitle>

        <div className="flex justify-center items-center mt-8">
          <h2 className="text-4xl">{t('marketing.reviews.dev')}</h2>
        </div>
      </Container>
    </Section>
  );
}
