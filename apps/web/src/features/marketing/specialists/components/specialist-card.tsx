import { useLocale } from 'next-intl';
import { MechanicDto } from '@autoservice/contracts';
import {
  defaultLocale,
  isAppLocale,
  type AppLocale,
} from '@/i18n/locale-config';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
} from '@/components/ui';

export interface SpecialistCardProps {
  mechanic: MechanicDto;
}

export default function SpecialistCard({ mechanic }: SpecialistCardProps) {
  const locale = useLocale();
  const currentLocale: AppLocale = isAppLocale(locale) ? locale : defaultLocale;
  const firstName = mechanic.name[currentLocale].firstName;
  const lastName = mechanic.name[currentLocale].lastName;

  const fullName = `${firstName} ${lastName}`;

  return (
    <Card className="group overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md p-4">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Avatar className="size-full after:rounded-none after:border-0">
          {mechanic.photo.url && (
            <AvatarImage
              src={mechanic.photo.url}
              alt={fullName}
              className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-none"
            />
          )}

          <AvatarFallback className="text-5xl rounded-none">
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
      </div>

      <CardContent>
        <h3 className="text-xl font-bold tracking-tight">{fullName}</h3>
      </CardContent>
    </Card>
  );
}
