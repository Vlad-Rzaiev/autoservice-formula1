import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from '@/components/ui';
import { cn } from '@/lib/utils';

export type IconItemCardProps = ComponentPropsWithoutRef<typeof Card> & {
  icon: IconProp;
  children: ReactNode;
  description?: string;
  iconClassName?: string;
  iconWrapperClassName?: string;
};

export function IconItemCard({
  icon,
  children,
  iconClassName,
  description,
  className,
  iconWrapperClassName,
  ...cardProps
}: IconItemCardProps) {
  return (
    <Card
      className={cn(
        'flex h-full flex-row items-center gap-3 rounded-xl border-border bg-card p-4',
        className,
      )}
      {...cardProps}
    >
      <div
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500',
          iconWrapperClassName,
        )}
      >
        <FontAwesomeIcon
          icon={icon}
          aria-hidden="true"
          className={cn('text-sm', iconClassName)}
        />
      </div>

      <span className="flex flex-col">
        <span className="text-sm leading-6 text-foreground">{children}</span>

        {description && <span>{description}</span>}
      </span>
    </Card>
  );
}
