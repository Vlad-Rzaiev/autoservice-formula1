import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { cn } from '@/lib/utils';

export type IconCardProps = ComponentPropsWithoutRef<typeof Card> & {
  icon: IconProp;
  title: ReactNode;
  description: ReactNode;
  footer?: ReactNode;
  iconClassName?: string;
};

export function IconCard({
  icon,
  title,
  description,
  footer,
  className,
  iconClassName,
  ...cardProps
}: IconCardProps) {
  return (
    <Card
      className={cn('h-full overflow-hidden border-border bg-card', className)}
      {...cardProps}
    >
      <CardHeader>
        <div
          className="
            mb-4 flex size-12 items-center justify-center
            rounded-xl bg-red-500/10 text-red-500
          "
        >
          <FontAwesomeIcon
            icon={icon}
            aria-hidden="true"
            className={cn('text-xl', iconClassName)}
          />
        </div>

        <CardTitle className="text-xl font-bold">{title}</CardTitle>

        <CardDescription className="leading-7">{description}</CardDescription>
      </CardHeader>

      {footer && <CardFooter className="mt-auto">{footer}</CardFooter>}
    </Card>
  );
}
