import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
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
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center md:justify-start">
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

          <div className="flex w-full min-w-0 flex-col gap-2 overflow-hidden">
            <p className="wrap-break-word text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {displayName}
            </p>

            <p className="break-all text-sm font-medium text-muted-foreground">
              ID: {userId}
            </p>

            <p className="break-all text-sm text-muted-foreground">{email}</p>

            {phone && (
              <a
                href={`tel:${phone}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {formatPhoneNumber(phone)}
              </a>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
