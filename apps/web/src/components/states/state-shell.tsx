import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';
import {
  containerVariantClassNames,
  iconVariantClassNames,
} from '@/components/states';

export type StateShellVariant = 'default' | 'error' | 'loading';

export interface StateShellProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
> {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  variant?: StateShellVariant;
  iconClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionsClassName?: string;
}

export const StateShell = ({
  icon,
  title,
  description,
  actions,
  variant = 'default',
  iconClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  className,
  ...restProps
}: StateShellProps) => {
  return (
    <div
      className={cn(
        'my-10 flex min-h-52 flex-col items-center justify-center',
        'rounded-2xl border px-6 py-10 text-center shadow-sm',
        containerVariantClassNames[variant],
        className,
      )}
      {...restProps}
    >
      <div
        aria-hidden="true"
        className={cn(
          'relative flex size-14 items-center justify-center rounded-2xl border',
          iconVariantClassNames[variant],
          iconClassName,
        )}
      >
        {icon}
      </div>

      <div className={cn('mt-4 max-w-lg', contentClassName)}>
        <p
          className={cn(
            'text-base font-semibold text-foreground sm:text-lg',
            titleClassName,
          )}
        >
          {title}
        </p>

        {description && (
          <p
            className={cn(
              'mt-2 text-sm leading-6 text-muted-foreground',
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>

      {actions && <div className={cn('mt-6', actionsClassName)}>{actions}</div>}
    </div>
  );
};
