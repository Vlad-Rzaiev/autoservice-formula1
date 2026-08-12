import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

export type SectionProps = ComponentPropsWithoutRef<'section'> & {
  noTopPadding?: boolean;
};

export default function Section({
  children,
  className,
  noTopPadding = false,
  ...sectionProps
}: SectionProps) {
  return (
    <section
      className={cn(
        'scroll-mt-(--marketing-header-height)',
        'pb-16 pt-16 md:pb-20 md:pt-20 lg:pb-24 lg:pt-24',
        noTopPadding && 'pt-0 md:pt-0 lg:pt-0',
        className,
      )}
      {...sectionProps}
    >
      {children}
    </section>
  );
}
