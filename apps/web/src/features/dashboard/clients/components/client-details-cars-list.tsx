'use client';

import { ButtonLink } from '@/components/common';
import { Container, Section } from '@/components/layout';
import { EmptyState } from '@/components/states';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { routes } from '@/config';
import { useCars } from '@/features/dashboard/cars/api/use-cars';
import CarCard from '@/features/dashboard/cars/components/car-card';
import { CarsListLabels } from '@/features/dashboard/config/cars-list.types';
import { faCarBurst, faCarRear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

interface ClientCarsListProps {
  clientId: string;
}

export default function ClientCarsList({ clientId }: ClientCarsListProps) {
  const t = useTranslations('clients.client-page.cars-list');

  const { data, isFetching } = useCars({
    page: 1,
    limit: 100,
    ownerId: clientId,
  });

  const listLabels: CarsListLabels = {
    car: t('columns.car'),
    year: t('columns.year'),
    licensePlate: t('columns.license-plate'),
    vin: t('columns.vin'),
    mileage: t('columns.mileage'),
    unknownLicensePlate: t('columns.unknown-license-plate'),
    unknownMileage: t('columns.unknown-mileage'),
    mileageUnit: t('columns.mileage-unit'),
  };

  return (
    <Section noTopPadding>
      <Container>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('title')}
        </h2>

        {data && (
          <>
            <div
              className={`hidden overflow-hidden rounded-xl border border-border bg-card transition-opacity xl:block ${
                isFetching ? 'opacity-60' : ''
              }
          }`}
            >
              {data?.items.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">
                        {t('table.car')}
                      </TableHead>
                      <TableHead className="text-center">
                        {t('table.year')}
                      </TableHead>
                      <TableHead className="text-center">
                        {t('table.license-plate')}
                      </TableHead>
                      <TableHead className="text-center">
                        {t('table.vin')}
                      </TableHead>
                      <TableHead className="text-center">
                        {t('table.mileage')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {data.items.map((car) => (
                      <TableRow key={car._id}>
                        <TableCell className="pl-6 text-center">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 shrink-0">
                              <AvatarImage
                                src={car.photos[0] ?? undefined}
                                alt={car.brand}
                              />

                              <AvatarFallback>
                                <FontAwesomeIcon
                                  icon={faCarRear}
                                  aria-hidden="true"
                                />
                              </AvatarFallback>
                            </Avatar>

                            <ButtonLink
                              href={routes.dashboard.cars.detail(car._id)}
                              variant="link"
                              className="p-0"
                            >
                              {car.brand} {car.model}
                            </ButtonLink>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          {car.year}
                        </TableCell>

                        <TableCell className="text-center">
                          {car.licensePlate}
                        </TableCell>

                        <TableCell className="text-center">{car.vin}</TableCell>

                        <TableCell className="text-center">
                          {car.mileage}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <EmptyState
                  title={t('table.empty-title')}
                  description={t('table.empty-description')}
                  icon={faCarBurst}
                />
              )}
            </div>

            <div
              className={`grid grid-cols-1 gap-3 transition-opacity xl:hidden ${
                data?.items.length > 1 ? 'sm:grid-cols-2' : ''
              } ${isFetching ? 'opacity-60' : ''}`}
            >
              {data?.items.length > 0 ? (
                data.items.map((car) => (
                  <CarCard key={car._id} car={car} labels={listLabels} />
                ))
              ) : (
                <EmptyState
                  title={t('table.empty-title')}
                  description={t('table.empty-description')}
                  icon={faCarBurst}
                />
              )}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
