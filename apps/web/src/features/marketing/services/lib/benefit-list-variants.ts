import { cva } from 'class-variance-authority';

export const benefitListVariants = cva('', {
  variants: {
    variant: {
      default: 'relative mt-6 space-y-3',
      dark: 'mt-7 grid gap-3 sm:grid-cols-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const benefitItemVariants = cva('flex items-center', {
  variants: {
    variant: {
      default: [
        'gap-4 rounded-xl',
        'border border-border bg-background/70',
        'px-4 py-3',
      ],
      dark: 'gap-3 text-sm text-neutral-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const benefitIconVariants = cva(
  ['flex shrink-0 items-center justify-center', 'rounded-lg'],
  {
    variants: {
      variant: {
        default: ['size-10', 'bg-red-500/10 text-red-600', 'dark:text-red-400'],
        dark: 'size-9 bg-red-600/15 text-red-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const benefitTextVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sm font-medium text-foreground sm:text-base',
      dark: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const benefitFontAwesomeIconVariants = cva('shrink-0', {
  variants: {
    variant: {
      default: 'text-lg',
      dark: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
