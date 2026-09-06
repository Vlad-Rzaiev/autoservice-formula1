import React from 'react';
import { useTranslations } from 'next-intl';
import { Container, Section } from '@/components/layout';
import { DevelopmentPlaceholder } from '@/components/common';
import { routes } from '@/config';

export interface ContactsPageProps {
  children?: React.ReactNode;
}

export default function ContactsPage({}: ContactsPageProps) {
  const t = useTranslations('contacts');
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
