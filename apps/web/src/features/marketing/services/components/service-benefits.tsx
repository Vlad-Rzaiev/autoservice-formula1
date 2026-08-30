import { Container, Section, SectionHeader } from '@/components/layout';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

export default function ServiceBenefits() {
  const t = useTranslations('services.servicePage.benefits');
  return (
    <Section>
      <Container>
        <SectionHeader sectionTitle={t('title')} />

        <div className="grid gap-4 md:grid-cols-2">
          {['diagnostics', 'specialists', 'equipment', 'transparency'].map(
            (benefitKey) => (
              <div
                key={benefitKey}
                className="
                  flex items-start gap-4
                  rounded-2xl
                  border border-border
                  bg-card p-5
                "
              >
                <div
                  className="
                    flex size-10 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-red-500/10
                    text-red-500
                  "
                >
                  <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
                </div>

                <p className="pt-2 font-medium">{t(`${benefitKey}`)}</p>
              </div>
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}
