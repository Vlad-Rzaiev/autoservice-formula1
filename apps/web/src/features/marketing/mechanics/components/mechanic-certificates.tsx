import { CardGrid } from '@/components/common';
import { Container, Section, SectionTitle } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';
import { MechanicCertificateDto } from '@autoservice/contracts';
import {
  faAward,
  faCalendarCheck,
  faClock,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

export interface MechanicCertificatesProps {
  certificates: MechanicCertificateDto[];
}

export default function MechanicCertificates({
  certificates,
}: MechanicCertificatesProps) {
  const t = useTranslations('marketing.specialists.mechanic');

  return (
    certificates.length > 0 && (
      <Section>
        <Container>
          <SectionTitle className="mb-5 md:mb-8 lg:mb-10">
            {t('certificateTitle')}
          </SectionTitle>

          <CardGrid columns="two">
            {certificates.map((certificate) => (
              <li key={certificate.certificateNumber}>
                <Card className="h-full overflow-hidden border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                        <FontAwesomeIcon
                          icon={faAward}
                          aria-hidden="true"
                          className="text-xl"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-red-500">
                          {certificate.issuer}
                        </div>

                        <h3 className="text-xl font-bold">
                          {certificate.name}
                        </h3>

                        <p className="mt-2 leading-7 text-muted-foreground">
                          {certificate.title}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 border-t border-border pt-5 text-sm text-muted-foreground sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faCalendarCheck}
                          aria-hidden="true"
                          className="shrink-0"
                        />
                        <span>
                          {t('issuedAt')}: {certificate.issuedAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faClock}
                          aria-hidden="true"
                          className="shrink-0"
                        />
                        <span>
                          {certificate.expiresAt
                            ? `${t('expiresAt')}: ${certificate.expiresAt}`
                            : t('noExpiration')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <FontAwesomeIcon icon={faIdCard} aria-hidden="true" />
                      <span>{certificate.certificateNumber}</span>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </CardGrid>
        </Container>
      </Section>
    )
  );
}
