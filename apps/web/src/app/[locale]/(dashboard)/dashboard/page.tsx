import { getTranslations } from 'next-intl/server';
import { Section, Container } from '@/components/layout';
import { DevelopmentPlaceholder } from '@/components/common';
import { routes } from '@/config';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');

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
