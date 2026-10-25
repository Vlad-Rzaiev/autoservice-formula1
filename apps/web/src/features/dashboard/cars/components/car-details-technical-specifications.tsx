import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { BodyType, FuelType, Transmission } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { getCarTechnicalSpecifications } from '../../config/car-specifications';

interface CarTechnicalSpecificationsProps {
  vin: string;
  bodyType?: BodyType | null;
  fuelType?: FuelType | null;
  transmission?: Transmission | null;
  engine?: string | null;
  color?: string | null;
  countryOfRegistration?: string | null;
}

export default function CarTechnicalSpecifications({
  vin,
  bodyType,
  fuelType,
  transmission,
  engine,
  color,
  countryOfRegistration,
}: CarTechnicalSpecificationsProps) {
  const t = useTranslations('dashboard.car.technicalSpecifications');

  const specifications = getCarTechnicalSpecifications(
    {
      vin,
      bodyType,
      fuelType,
      transmission,
      engine,
      color,
      countryOfRegistration,
    },
    t,
  );

  if (specifications.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t('title')}
        </h2>

        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {specifications.map(({ key, label, value, icon }) => (
            <Card key={key} className="min-w-0">
              <CardContent className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FontAwesomeIcon icon={icon} className="text-lg" />
                </div>

                <div className="min-w-0 flex-1">
                  <dt className="mb-1 text-sm text-muted-foreground">
                    {label}
                  </dt>

                  <dd className="wrap-break-words font-semibold text-card-foreground">
                    {value}
                  </dd>
                </div>
              </CardContent>
            </Card>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
