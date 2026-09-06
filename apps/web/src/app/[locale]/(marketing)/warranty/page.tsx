import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Container, Section } from '@/components/layout';
import { DevelopmentPlaceholder } from '@/components/common';
import { routes } from '@/config';

export interface WarrantyPageProps {
  children?: React.ReactNode;
}

export default async function WarrantyPage({}: WarrantyPageProps) {
  const t = await getTranslations('marketing.warranty');
  return (
    <Section>
      <Container>
        <DevelopmentPlaceholder
          title={t('warranty.title')}
          description={t('warranty.description')}
          linkHref={routes.marketing.home}
          linkText={t('back-to-main')}
        />
      </Container>
    </Section>
  );
}
