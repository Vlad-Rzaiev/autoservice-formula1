import { useTranslations } from 'next-intl';
import { Section, Container, SectionTitle } from '@/components/layout';

export default function MarketingBooking() {
  const t = useTranslations();

  return (
    <Section id="booking">
      <Container>
        <SectionTitle>{t('marketing.booking.title')}</SectionTitle>

        <div className="flex justify-center items-center mt-8">
          <h2 className="text-4xl">{t('marketing.reviews.dev')}</h2>
        </div>
      </Container>
    </Section>
  );
}
