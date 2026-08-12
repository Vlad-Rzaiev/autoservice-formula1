'use client';

import { useTranslations } from 'next-intl';
import { ServiceDto } from '@autoservice/contracts';
import { Section, Container } from '@/components/layout';
import { DevelopmentPlaceholder } from '@/components/common';

export interface ServiceDetailsProps {
  service: ServiceDto;
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const t = useTranslations('services');

  return (
    <Section noTopPadding>
      <Container>
        {service && (
          <DevelopmentPlaceholder
            title={t('servicePage.title')}
            id={service.slug}
            description={t('servicePage.dev')}
            linkHref="/services"
            linkText={t('servicePage.back-to-services')}
          />
        )}
      </Container>
    </Section>
  );
}
