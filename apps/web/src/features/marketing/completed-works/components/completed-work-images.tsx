'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui';

interface CompletedWorkImagesProps {
  images: string[];
  alt: string;
  label: string;
}

export default function CompletedWorkImages({
  images,
  alt,
  label,
}: CompletedWorkImagesProps) {
  const t = useTranslations('marketing.completed-works');

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeImageIndex];

  const goToPrevImage = () => {
    setActiveImageIndex((currentIdx) =>
      currentIdx === 0 ? images.length - 1 : currentIdx - 1,
    );
  };

  const goToNextImage = () => {
    setActiveImageIndex((currentIdx) =>
      currentIdx === images.length - 1 ? 0 : currentIdx + 1,
    );
  };

  return (
    <div className="min-w-0 w-full space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border-6">
        <div
          key={activeImageIndex}
          className="absolute inset-0 animate-image-fade"
        >
          <Image
            src={activeImage}
            alt={`${alt} — ${label}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <span className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
          {label}
        </span>

        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={goToPrevImage}
              aria-label={t('actions.previous')}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm hover:bg-black/80 hover:text-white"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={goToNextImage}
              aria-label={t('actions.next')}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm hover:bg-black/80 hover:text-white"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>

            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
              {activeImageIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
