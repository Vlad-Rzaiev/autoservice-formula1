import { useTranslations } from 'next-intl';
import type { ClientDto } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { formatPhoneNumber } from '@/lib';

interface ClientInfoProps {
  client: ClientDto;
}

export default function ClientInfo({ client }: ClientInfoProps) {
  const t = useTranslations('clients.client-page.info');

  const clientInfo = [
    { label: t('name'), value: client.firstName },
    { label: t('last-name'), value: client.lastName },
    { label: t('id'), value: client.userId },
    {
      label: t('phone'),
      value: client.phone ? formatPhoneNumber(client.phone) : null,
    },
    { label: t('email'), value: client.email },
    { label: t('birthday'), value: client.birthDate },
    {
      label: t('gender'),
      value: client.gender
        ? client.gender === 'male'
          ? t('man')
          : t('woman')
        : null,
    },
  ].filter(({ value }) => Boolean(value));

  return (
    <Section noTopPadding>
      <Container>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('title')}
        </h2>

        <div className="divide-y divide-border border-y border-border">
          {clientInfo.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground sm:text-right">
                {value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
