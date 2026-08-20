import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { cn } from '@/lib';
import SectionTitle from '@/components/layout/section-title';

export interface SectionHeaderProps {
  sectionTitle: string;
  description?: string;
  eyebrow?: string;
  eyebrowIcon?: IconProp;
  className?: string;
}

export default function SectionHeader({
  sectionTitle,
  description,
  eyebrow,
  eyebrowIcon,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center mb-10 md:mb-12 lg:mb-14',
        className,
      )}
    >
      {eyebrow && (
        <div
          className="
            inline-flex items-center gap-2 rounded-full
            border border-red-500/20 bg-red-500/10
            px-4 py-2 text-sm font-semibold text-red-600
            dark:text-red-400
        "
        >
          {eyebrowIcon && (
            <FontAwesomeIcon
              icon={eyebrowIcon}
              aria-hidden="true"
              className="shrink-0 text-sm"
            />
          )}

          {eyebrow}
        </div>
      )}

      <SectionTitle>{sectionTitle}</SectionTitle>

      {description && (
        <p className="mt-5 max-w-3xl text-center text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}
