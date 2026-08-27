import { getTranslations } from 'next-intl/server';
import { DevelopmentPlaceholder } from '@/components/common';
import { Section, Container } from '@/components/layout';
import { routes } from '@/config';

export default async function SpecialistsPage() {
  const t = await getTranslations('specialists');

  return (
    <Section noTopPadding>
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
