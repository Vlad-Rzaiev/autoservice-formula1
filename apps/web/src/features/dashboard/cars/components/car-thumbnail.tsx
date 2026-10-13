import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import type { CarDto } from '@autoservice/contracts';

interface CarThumbnailProps {
  car: CarDto;
}

export default function CarThumbnail({ car }: CarThumbnailProps) {
  const photo = car.photos[0];

  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={56}
          height={56}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        <FontAwesomeIcon
          icon={faCarSide}
          aria-hidden="true"
          className="text-xl text-muted-foreground"
        />
      )}
    </div>
  );
}
