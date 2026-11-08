'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faEnvelopeCircleCheck,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { CardGrid } from '@/components/common';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

interface ClientsStatCardsProps {
  total: number;
  verified: number | null;
  unverified: number | null;
  isLoading?: boolean;
}

export default function ClientsStatCards({
  total,
  verified,
  unverified,
  isLoading = false,
}: ClientsStatCardsProps) {
  const t = useTranslations('clients.stats');

  const stats = [
    {
      key: 'total',
      label: t('total'),
      value: total,
      icon: faUsers,
      iconClassName: 'bg-primary/10 text-primary',
    },
    {
      key: 'verified',
      label: t('verified'),
      value: verified,
      icon: faEnvelopeCircleCheck,
      iconClassName: 'bg-emerald-500/10 text-emerald-600',
    },
    {
      key: 'unverified',
      label: t('unverified'),
      value: unverified,
      icon: faEnvelope,
      iconClassName: 'bg-amber-500/10 text-amber-600',
    },
  ];

  return (
    <CardGrid columns="three">
      {stats.map((stat) => (
        <li key={stat.key} className="min-w-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between gap-3">
                <p className="text-2xl font-bold tracking-tight tabular-nums">
                  {isLoading || stat.value === null
                    ? '—'
                    : stat.value.toLocaleString()}
                </p>

                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.iconClassName}`}
                >
                  <FontAwesomeIcon
                    icon={stat.icon}
                    aria-hidden="true"
                    className="text-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </CardGrid>
  );
}
