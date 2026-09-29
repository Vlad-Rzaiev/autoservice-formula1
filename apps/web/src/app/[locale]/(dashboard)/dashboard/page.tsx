import { useTranslations } from 'next-intl';
import { Section, Container } from '@/components/layout';
import { DevelopmentPlaceholder } from '@/components/common';
import { routes } from '@/config';

export default function DashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <Section>
      <Container>
        <DevelopmentPlaceholder
          title={t('title')}
          description={t('dev')}
          linkHref={routes.marketing.home}
          linkText={t('back-to-main')}
        />
      </Container>
    </Section>
  );
}
