import { ButtonLink } from '@/components/common';
import { Container, Section } from '@/components/layout';
import { routes } from '@/config';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

export default function WarrantyClaim() {
  const t = useTranslations('warranty.claim');

  return (
    <Section>
      <Container>
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-success/10 text-success">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="size-5"
                  aria-hidden="true"
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t('title')}
              </h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                {t('description')}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink href={routes.marketing.booking}>
                {t('booking')}
              </ButtonLink>

              <ButtonLink href={routes.marketing.contacts} variant="outline">
                {t('contacts')}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
