import { useTranslations } from 'next-intl';
import { Section, Container, SectionTitle } from '@/components/layout';

export default function MarketingBooking() {
  const t = useTranslations();

  return (
    <Section id="booking">
      <Container>
        <SectionTitle>{t('marketing.booking.title')}</SectionTitle>
      </Container>
    </Section>
  );
}
