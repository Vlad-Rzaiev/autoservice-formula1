import { useLocale } from 'next-intl';
import { defaultLocale, isAppLocale } from '@/i18n/locale-config';
import { AppLocale, ServiceDto } from '@autoservice/contracts';
import ServiceHero from './service-hero';
import ServiceWorkDirections from './service-work-directions';
import ServiceSpecializations from './service-specializations';
import ServiceProcess from './service-process';
import ServiceBenefits from './service-benefits';
import ServiceCta from '@/features/marketing/services/components/service-cta';

export interface ServiceDetailsProps {
  service: ServiceDto;
}

export default function ServiceDetails({ service }: ServiceDetailsProps) {
  const locale = useLocale();
  const currentLocale: AppLocale = isAppLocale(locale) ? locale : defaultLocale;

  const translation = service.translations[currentLocale];

  return (
    <>
      <ServiceHero
        icon={service.iconKey}
        title={translation.title}
        description={translation.description}
      />

      {service.workDirectionIds.length > 0 && (
        <ServiceWorkDirections workDirections={service.workDirectionIds} />
      )}

      {service.specializationIds.length > 0 && (
        <ServiceSpecializations specializations={service.specializationIds} />
      )}

      <ServiceProcess />

      <ServiceBenefits />

      <ServiceCta />
    </>
  );
}
