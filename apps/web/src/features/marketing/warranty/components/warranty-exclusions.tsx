import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { Container, Section, SectionHeader } from '@/components/layout';

export default function WarrantyExclusions() {
  const t = useTranslations('warranty.exclusions');

  const exclusions = [
    t('items.normalWear'),
    t('items.accidentDamage'),
    t('items.improperUse'),
    t('items.externalRepair'),
    t('items.unrelatedFailure'),
  ];

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={t('eyebrow')}
          sectionTitle={t('title')}
          description={t('description')}
        />

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {exclusions.map((exclusion, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 first:rounded-t-2xl last:rounded-b-2xl"
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />

              <p className="text-sm leading-6 text-foreground">{exclusion}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
