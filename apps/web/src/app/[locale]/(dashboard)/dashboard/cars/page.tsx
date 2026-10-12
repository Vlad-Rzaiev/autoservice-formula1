import { getTranslations } from 'next-intl/server';
import { Section, Container } from '@/components/layout';
import { DevelopmentPlaceholder } from '@/components/common';
import { routes } from '@/config';

export default async function AllCarsPage() {
  const t = await getTranslations('dashboard.settings');

  return (
    <Section>
      <Container>
        <DevelopmentPlaceholder
          title={'Cars'}
          description={t('dev')}
          linkHref={routes.marketing.home}
          linkText={t('back-to-main')}
        />
      </Container>
    </Section>
  );
}
