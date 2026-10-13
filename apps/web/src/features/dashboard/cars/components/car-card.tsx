import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import type { CarDto } from '@autoservice/contracts';
import { Badge } from '@/components/ui/badge';
import CarThumbnail from './car-thumbnail';
import type { CarsListLabels } from '../../config/cars-list.types';
import { routes } from '@/config';

interface CarCardProps {
  car: CarDto;
  labels: CarsListLabels;
}

export default function CarCard({ car, labels }: CarCardProps) {
  const locale = useLocale();

  const formatMileage = (mileage: number) =>
    new Intl.NumberFormat(locale).format(mileage);

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        <CarThumbnail car={car} />

        <div className="min-w-0 flex-1">
          <Link
            href={routes.dashboard.cars.detail(car._id)}
            className="font-semibold text-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {car.brand} {car.model}
          </Link>

          <p className="mt-1 text-sm text-muted-foreground">
            {car.year}
            {car.generation ? ` · ${car.generation}` : ''}
          </p>

          <div className="mt-3">
            {car.licensePlate ? (
              <Badge variant="outline" className="font-mono tracking-wide">
                {car.licensePlate}
              </Badge>
            ) : (
              <span className="text-sm text-muted-foreground">
                {labels.unknownLicensePlate}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">{labels.vin}</span>

          <span className="break-all font-mono text-xs text-foreground">
            {car.vin}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">
            {labels.mileage}
          </span>

          {car.mileage !== null ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <FontAwesomeIcon
                icon={faGaugeHigh}
                aria-hidden="true"
                className="text-muted-foreground"
              />
              {formatMileage(car.mileage)} {labels.mileageUnit}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">
              {labels.unknownMileage}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
