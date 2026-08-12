'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import {
  buttonVariants,
  type ButtonVariantProps,
} from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonVariant = NonNullable<ButtonVariantProps['variant']>;
type ButtonSize = NonNullable<ButtonVariantProps['size']>;

type IconButtonVariant = Extract<ButtonVariant, 'iconSurface' | 'iconGhost'>;

type IconButtonSize = Extract<ButtonSize, 'icon-lg' | 'icon-xl' | 'icon-2xl'>;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  'aria-label': string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      asChild = false,
      className,
      variant = 'iconSurface',
      size = 'icon-xl',
      type = 'button',
      ...props
    },
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={forwardedRef}
        type={asChild ? undefined : type}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

IconButton.displayName = 'IconButton';
