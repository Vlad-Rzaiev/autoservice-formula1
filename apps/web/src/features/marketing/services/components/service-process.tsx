import { Container, Section, SectionHeader } from '@/components/layout';
import { useTranslations } from 'next-intl';

export default function ServiceProcess() {
  const t = useTranslations('services.servicePage.process');
  return (
    <Section>
      <Container>
        <SectionHeader sectionTitle={t('title')} />

        <div
          className="
              grid gap-6
              md:grid-cols-2
              lg:grid-cols-4
            "
        >
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className="
                  relative rounded-2xl
                  border border-border
                  bg-card p-6
                "
            >
              <div
                className="
                    flex size-10 items-center justify-center
                    rounded-full bg-red-500/10
                    font-bold text-red-500
                  "
              >
                {stepNumber}
              </div>

              <h3 className="mt-5 text-lg font-bold">
                {t(`step${stepNumber}.title`)}
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                {t(`step${stepNumber}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
