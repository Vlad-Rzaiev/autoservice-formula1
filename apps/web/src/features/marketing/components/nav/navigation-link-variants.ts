import { cva, type VariantProps } from 'class-variance-authority';

export const navigationVariants = cva('', {
  variants: {
    variant: {
      header: 'hidden min-[1180px]:block',
      footer: 'block',
      mobile: 'mb-6 block',
    },
  },
  defaultVariants: {
    variant: 'header',
  },
});

export const navigationListVariants = cva('flex', {
  variants: {
    variant: {
      header: 'items-center gap-1 xl:gap-2',
      footer: 'flex-col items-start gap-3',
      mobile: [
        'flex-col overflow-hidden rounded-2xl',
        'border border-border bg-surface',
      ],
    },
  },
  defaultVariants: {
    variant: 'header',
  },
});

export const navigationItemVariants = cva('', {
  variants: {
    variant: {
      header: '',
      footer: '',
      mobile: 'border-b border-border last:border-b-0',
    },
  },
  defaultVariants: {
    variant: 'header',
  },
});

export const navigationLinkVariants = cva(
  [
    'group inline-flex items-center',
    'text-sm text-foreground/65',
    'transition-colors duration-200',
    'focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        header: [
          'relative whitespace-nowrap',
          'rounded-lg px-2.5 py-2',
          'font-semibold tracking-tight',
          'hover:bg-foreground/5 hover:text-foreground',
        ],

        footer: ['w-fit rounded-sm font-medium', 'hover:text-red-500'],

        mobile: [
          'relative flex min-h-13 w-full',
          'justify-between gap-3 px-4 py-3',
          'text-base font-semibold tracking-tight',
          'text-foreground/65',
          'hover:bg-foreground/5 hover:text-foreground',
          'focus-visible:ring-inset',
        ],
      },
    },

    defaultVariants: {
      variant: 'header',
    },
  },
);

export type NavigationVariantProps = VariantProps<
  typeof navigationLinkVariants
>;

export type NavigationVariant = NonNullable<NavigationVariantProps['variant']>;
