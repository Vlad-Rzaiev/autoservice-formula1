import { faCalendarDays, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { Container, Section, SectionHeader } from '@/components/layout';
import { WarrantyPeriodValue } from './warranty-period-value';

export default function WarrantyPeriod() {
  const t = useTranslations('warranty.period');

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          sectionTitle={t('title')}
          description={t('description')}
        />

        <div className="mt-10 rounded-2xl border border-success/30 bg-success/5 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <WarrantyPeriodValue
              icon={faCalendarDays}
              value={t('duration.value')}
              label={t('duration.label')}
            />

            <WarrantyPeriodValue
              icon={faGaugeHigh}
              value={t('mileage.value')}
              label={t('mileage.label')}
            />
          </div>

          <p className="mt-8 border-t border-success/20 pt-6 text-sm leading-6 text-muted-foreground">
            {t('note')}
          </p>
        </div>
      </Container>
    </Section>
  );
}
