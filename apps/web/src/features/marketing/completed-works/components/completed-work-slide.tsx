'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  completedWorksCategories,
  type CompletedWorkDto,
} from '@autoservice/contracts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import {
  defaultLocale,
  isAppLocale,
  type AppLocale,
} from '@/i18n/locale-config';

import { Card, CardContent } from '@/components/ui';

interface CompletedWorkSlideProps {
  completedWork: CompletedWorkDto;
}

export default function CompletedWorkSlide({
  completedWork,
}: CompletedWorkSlideProps) {
  const locale = useLocale();
  const currentLocale: AppLocale = isAppLocale(locale) ? locale : defaultLocale;
  const t = useTranslations('marketing.completed-works');

  const category = completedWorksCategories.find(
    (categoryItem) => categoryItem.slug === completedWork.category.slug,
  );

  const categoryLabel =
    category?.translations[currentLocale] ?? completedWork.category.slug;

  const carName = `${completedWork.car.make.toUpperCase()} ${completedWork.car.model}`;

  const completedWorkTranslation = completedWork.translations[currentLocale];

  const beforeImage = completedWork.images.before[0];
  const afterImage = completedWork.images.after[0];

  return (
    <Card className="overflow-hidden border shadow-none p-0">
      <CardContent className="p-0">
        <div className="space-y-6 p-4 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="relative aspect-video overflow-hidden rounded-xl border-6">
              <Image
                src={beforeImage}
                alt={`${carName} — ${t('labels.before')}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <span className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                {t('labels.before')}
              </span>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl border-6">
              <Image
                src={afterImage}
                alt={`${carName} — ${t('labels.after')}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <span className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                {t('labels.after')}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-2xl font-bold tracking-tight">{carName}</h3>

            <span className="text-sm font-medium text-muted-foreground">
              {categoryLabel}
            </span>
          </div>

          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            {completedWorkTranslation.customerRequest}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-muted/30 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('labels.diagnosis')}
              </p>

              <p className="leading-7">{completedWorkTranslation.diagnosis}</p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('labels.performedWork')}
              </p>

              <ul className="space-y-2">
                {completedWorkTranslation.performedWork.map((workItem) => (
                  <li
                    key={workItem}
                    className="flex gap-2 leading-6 items-center"
                  >
                    <span className="shrink-0 text-primary">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>

                    <span>{workItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t pt-5">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <FontAwesomeIcon icon={faCheck} />
              {t('labels.result')}
            </p>

            <p className="leading-7">{completedWorkTranslation.result}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
