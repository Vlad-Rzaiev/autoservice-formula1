import { cva, type VariantProps } from "class-variance-authority";

export const brandLogoVariants = cva(
  [
    "group relative inline-flex shrink-0 items-center",
    "overflow-hidden border border-border",
    "bg-foreground text-background",
    "transition-all duration-300",
    "hover:shadow-lg",
    "active:translate-y-0",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        header: "h-8 rounded-xl px-4 shadow-md",
        footer: "h-10 rounded-xl px-5 shadow-md",
        mobileMenu: "h-9 rounded-xl px-4 shadow-md",
      },
    },
    defaultVariants: {
      variant: "header",
    },
  },
);

export const brandLogoContentVariants = cva(
  "relative z-10 flex items-center italic",
  {
    variants: {
      variant: {
        header: "text-2xl",
        footer: "text-3xl",
        mobileMenu: "text-2xl",
      },
    },
    defaultVariants: {
      variant: "header",
    },
  },
);

export type BrandLogoVariantProps = VariantProps<typeof brandLogoVariants>;

export type BrandLogoVariant = NonNullable<BrandLogoVariantProps["variant"]>;
