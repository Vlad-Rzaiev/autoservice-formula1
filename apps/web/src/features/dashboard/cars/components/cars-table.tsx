import { Link } from '@/i18n/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from 'next-intl';
import type { CarDto } from '@autoservice/contracts';
import { Badge } from '@/components/ui/badge';
import CarThumbnail from './car-thumbnail';
import type { CarsListLabels } from '../../config/cars-list.types';
import { routes } from '@/config';

interface CarsTableProps {
  cars: CarDto[];
  labels: CarsListLabels;
}

export default function CarsTable({ cars, labels }: CarsTableProps) {
  const locale = useLocale();

  const formatMileage = (mileage: number) =>
    new Intl.NumberFormat(locale).format(mileage);

  return (
    <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                {labels.car}
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {labels.year}
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {labels.licensePlate}
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {labels.vin}
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {labels.mileage}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {cars.map((car) => (
              <tr key={car._id} className="transition-colors hover:bg-muted/30">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <CarThumbnail car={car} />

                    <div className="min-w-0">
                      <Link
                        href={routes.dashboard.cars.detail(car._id)}
                        className="font-semibold text-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {car.brand} {car.model}
                      </Link>

                      {car.generation && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {car.generation}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 tabular-nums text-foreground">
                  {car.year}
                </td>

                <td className="px-4 py-4">
                  {car.licensePlate ? (
                    <Badge
                      variant="outline"
                      className="font-mono tracking-wide"
                    >
                      {car.licensePlate}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">
                      {labels.unknownLicensePlate}
                    </span>
                  )}
                </td>

                <td className="px-4 py-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {car.vin}
                  </span>
                </td>

                <td className="px-4 py-4">
                  {car.mileage !== null ? (
                    <span className="inline-flex items-center gap-2 whitespace-nowrap text-foreground">
                      <FontAwesomeIcon
                        icon={faGaugeHigh}
                        aria-hidden="true"
                        className="text-muted-foreground"
                      />

                      <span className="tabular-nums">
                        {formatMileage(car.mileage)} {labels.mileageUnit}
                      </span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {labels.unknownMileage}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
