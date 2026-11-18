import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAt,
  faHashtag,
  faPhone,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Section } from '@/components/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { formatPhoneNumber } from '@/lib';

interface ClientHeaderProps {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  phone: string;
}

export default function ClientHeader({
  photo,
  firstName,
  lastName,
  email,
  userId,
  phone,
}: ClientHeaderProps) {
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || email;

  return (
    <Section noTopPadding>
      <Container>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8 justify-center md:justify-start">
          <Avatar className="size-50 md:size-75">
            {photo && <AvatarImage src={photo} alt={displayName} />}

            <AvatarFallback>
              <FontAwesomeIcon
                icon={faUserCircle}
                aria-hidden="true"
                style={{ width: '100%', height: '100%' }}
              />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2 overflow-hidden">
            <p className="wrap-break-word text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {displayName}
            </p>

            <p className="break-all text-sm font-medium text-muted-foreground">
              <FontAwesomeIcon
                icon={faHashtag}
                aria-hidden="true"
                className="text-destructive"
              />{' '}
              ID: {userId}
            </p>

            <p className="break-all text-sm text-muted-foreground">
              <FontAwesomeIcon
                icon={faAt}
                aria-hidden="true"
                className="text-destructive"
              />{' '}
              {email}
            </p>

            {phone && (
              <a
                href={`tel:${phone}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  aria-hidden="true"
                  className="text-destructive"
                />{' '}
                {formatPhoneNumber(phone)}
              </a>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
