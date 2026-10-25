'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCarSide,
  faChevronLeft,
  faChevronRight,
  faGaugeHigh,
  faGears,
  faIdCard,
  faPencil,
  faScrewdriverWrench,
} from '@fortawesome/free-solid-svg-icons';
import type { UserRole } from '@autoservice/contracts';
import { Container, Section } from '@/components/layout';
import { Button, Card, CardContent } from '@/components/ui';

interface CarDetailsHeroProps {
  photos: string[];
  brand: string;
  model: string;
  year: number;
  generation: string | null;
  licensePlate: string | null;
  mileage: number | null;
  userRole: UserRole;
  onEdit?: () => void;
  onViewRepairs?: () => void;
}

export default function CarDetailsHero({
  photos,
  brand,
  model,
  year,
  generation,
  licensePlate,
  mileage,
  userRole,
  onEdit,
  onViewRepairs,
}: CarDetailsHeroProps) {
  const t = useTranslations('dashboard.car.hero');
  const locale = useLocale();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const formattedMileage =
    mileage !== null ? new Intl.NumberFormat(locale).format(mileage) : null;

  const canEditCar =
    userRole === 'owner' || userRole === 'manager' || userRole === 'client';

  const hasPhotos = photos.length > 0;
  const activePhotoIndexSafe =
    hasPhotos && activePhotoIndex < photos.length ? activePhotoIndex : 0;
  const activePhoto = photos[activePhotoIndexSafe];

  const goToPrevPhoto = () => {
    setActivePhotoIndex((currentIndex) =>
      currentIndex <= 0 ? photos.length - 1 : currentIndex - 1,
    );
  };

  const goToNextPhoto = () => {
    setActivePhotoIndex((currentIndex) =>
      currentIndex >= photos.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const specifications = [
    { label: t('brand'), value: brand, icon: faCarSide },
    { label: t('model'), value: model, icon: faCarSide },
    { label: t('year'), value: String(year), icon: faCalendarDays },
    ...(generation
      ? [{ label: t('generation'), value: generation, icon: faGears }]
      : []),
    ...(licensePlate
      ? [{ label: t('licensePlate'), value: licensePlate, icon: faIdCard }]
      : []),
  ];

  return (
    <Section noTopPadding>
      <Container>
        <h2 className="sr-only">
          {brand} {model} {year}
        </h2>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)] lg:gap-10">
          <div className="min-w-0">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-muted sm:aspect-video">
              {hasPhotos ? (
                <Image
                  key={activePhoto}
                  src={activePhoto}
                  alt={`${brand} ${model} ${year}`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <FontAwesomeIcon
                    icon={faCarSide}
                    aria-hidden="true"
                    className="text-5xl"
                  />
                  <p>{t('photo')}</p>
                </div>
              )}

              {photos.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={t('previousPhoto')}
                    onClick={goToPrevPhoto}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm hover:bg-black/80 hover:text-white"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={t('nextPhoto')}
                    onClick={goToNextPhoto}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm hover:bg-black/80 hover:text-white"
                  >
                    <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
                  </Button>

                  <span
                    aria-live="polite"
                    className="absolute bottom-4 left-4 rounded-md bg-black/65 px-3 py-1.5 text-sm font-medium text-white"
                  >
                    {activePhotoIndexSafe + 1} / {photos.length}
                  </span>
                </>
              )}
            </div>

            {photos.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
                {photos.map((photo, index) => (
                  <button
                    key={`${photo}-${index}`}
                    type="button"
                    aria-label={`${t('photo')}: ${index + 1}`}
                    aria-pressed={activePhotoIndexSafe === index}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`relative aspect-4/3 overflow-hidden rounded-lg border-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
                      activePhotoIndexSafe === index
                        ? 'border-primary'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={photo}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 25vw, 12vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col py-1 lg:py-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {brand} {model}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>{year}</span>

              {generation && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{generation}</span>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {licensePlate && (
                <Card>
                  <CardContent>
                    <FontAwesomeIcon
                      icon={faIdCard}
                      aria-hidden="true"
                      className="text-muted-foreground"
                    />
                    <span className="font-semibold tracking-wide">
                      {licensePlate}
                    </span>
                  </CardContent>
                </Card>
              )}

              {formattedMileage !== null && (
                <Card>
                  <CardContent>
                    <FontAwesomeIcon
                      icon={faGaugeHigh}
                      aria-hidden="true"
                      className="text-primary"
                    />
                    <span className="font-semibold">
                      {formattedMileage} {t('mileageUnit')}
                    </span>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="my-6 h-1 w-14 rounded-full bg-primary" />

            <dl className="space-y-4">
              {specifications.map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 gap-y-1 sm:grid-cols-[20px_minmax(0,1fr)_auto]"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    aria-hidden="true"
                    className="mt-1 text-muted-foreground"
                  />

                  <dt className="text-sm text-muted-foreground">{label}</dt>

                  <dd className="col-start-2 min-w-0 wrap-break-word font-semibold text-foreground sm:col-start-3 sm:text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {canEditCar && onEdit && (
              <Button
                type="button"
                onClick={onEdit}
                className="cursor-pointer gap-2 mt-4"
              >
                <FontAwesomeIcon icon={faPencil} aria-hidden="true" />
                {t('edit')}
              </Button>
            )}

            {onViewRepairs && (
              <Button
                type="button"
                onClick={onViewRepairs}
                variant="outline"
                className="cursor-pointer gap-2 mt-4"
              >
                <FontAwesomeIcon
                  icon={faScrewdriverWrench}
                  aria-hidden="true"
                />
                {t('viewRepairs')}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
