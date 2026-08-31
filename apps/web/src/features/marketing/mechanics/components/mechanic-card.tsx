import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faAward,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import { useLocale, useTranslations } from 'next-intl';
import {
  defaultLocale,
  isAppLocale,
  type AppLocale,
} from '@/i18n/locale-config';
import { MechanicDto } from '@autoservice/contracts';
import Image from 'next/image';
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  Separator,
} from '@/components/ui';
import { ButtonLink } from '@/components/common';
import { routes } from '@/config';

export interface MechanicCardProps {
  mechanic: MechanicDto;
}

export default function MechanicCard({ mechanic }: MechanicCardProps) {
  const t = useTranslations('marketing.specialists.mechanic');
  const locale = useLocale();
  const currentLocale: AppLocale = isAppLocale(locale) ? locale : defaultLocale;
  const firstName = mechanic.name[currentLocale].firstName;
  const lastName = mechanic.name[currentLocale].lastName;

  const fullName = `${firstName} ${lastName}`;
  const mainSpecialization =
    mechanic.specializations[0].translations[currentLocale].title;

  return (
    <Card className="group overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="px-4">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl border-4 border-success bg-muted">
          {mechanic.photo.url ? (
            <Image
              src={mechanic.photo.url}
              alt={fullName}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="eager"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-5xl text-muted-foreground">
              {firstName[0]}
              {lastName[0]}
            </div>
          )}
        </div>
      </div>

      <CardContent>
        <h3 className="text-xl font-bold tracking-tight">{fullName}</h3>

        <p className="mt-1 text-sm font-medium text-primary">
          {mainSpecialization}
        </p>

        <Separator className="my-4" />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FontAwesomeIcon
            icon={faBriefcase}
            className="shrink-0 text-primary"
          />

          <span>{`${mechanic.experienceYears} ${t('yearsOfExperience')}`}</span>
        </div>

        {mechanic.certificates.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <FontAwesomeIcon icon={faAward} />
              <span>{t('certifications')}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {mechanic.certificates.map((certificate, idx) => (
                <Badge
                  key={idx}
                  variant="destructive"
                  className="rounded-lg px-2.5 py-1"
                >
                  {certificate.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <ButtonLink
          href={routes.marketing.mechanic(mechanic._id)}
          variant="iconSurface"
          className="ml-auto"
        >
          {t('profile')}
          <FontAwesomeIcon
            icon={faArrowRight}
            className="transition-transform duration-200 group-hover/button:translate-x-1"
          />
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
