import { getTranslations } from 'next-intl/server';

import { Section, Container } from '@/components/layout';
import { LoadingState } from '@/components/states';

export default async function Loading() {
  const t = await getTranslations('services');

  return (
    <Section noTopPadding>
      <Container>
        <LoadingState title={t('servicePage.loading-title')} />
      </Container>
    </Section>
  );
}
