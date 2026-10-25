'use client';

import { useFormatter, useTranslations } from 'next-intl';
import {
  faCalendarCheck,
  faClock,
  faFileLines,
  faRotate,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { CarDto } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { Card, CardContent } from '@/components/ui';

interface CarAdditionalInformationProps {
  car: Pick<
    CarDto,
    'registrationDate' | 'notes' | 'isActive' | 'createdAt' | 'updatedAt'
  >;
}

export default function CarAdditionalInformation({
  car,
}: CarAdditionalInformationProps) {
  const t = useTranslations('dashboard.car.additional-information');
  const format = useFormatter();

  const formatDate = (value: string | null) => {
    if (!value) return null;

    return format.dateTime(new Date(value), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const items = [
    {
      key: 'registration-date',
      label: t('registration-date'),
      value: formatDate(car.registrationDate),
      icon: faCalendarCheck,
    },
    {
      key: 'status',
      label: t('status'),
      value: car.isActive ? t('active') : t('inactive'),
      icon: faShieldHalved,
    },
    {
      key: 'created-at',
      label: t('created-at'),
      value: formatDate(car.createdAt),
      icon: faClock,
    },
    {
      key: 'updated-at',
      label: t('updated-at'),
      value: formatDate(car.updatedAt),
      icon: faRotate,
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">{t('title')}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.key}>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                  <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-medium">
                    {item.value ?? t('not-provided')}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-3">
              <FontAwesomeIcon
                icon={faFileLines}
                className="text-primary"
                aria-hidden="true"
              />
              <h3 className="font-semibold">{t('notes')}</h3>
            </div>

            {car.notes?.trim() ? (
              <p className="whitespace-pre-wrap wrap-break-words text-sm leading-6 text-muted-foreground">
                {car.notes}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">{t('no-notes')}</p>
            )}
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
