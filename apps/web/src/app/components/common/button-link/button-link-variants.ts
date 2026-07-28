import { cva, type VariantProps } from "class-variance-authority";

const ctaInteractionClasses = [
  "rounded-xl font-semibold transition-all duration-200",
  "focus-visible:ring-offset-2",
  "active:translate-y-0 active:scale-[0.98]",
] as const;

export const buttonLinkVariants = cva(
  [
    "group inline-flex items-center justify-center gap-2",
    "focus-visible:outline-none focus-visible:ring-2",
    "motion-reduce:transform-none motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          ...ctaInteractionClasses,
          "bg-red-600 text-white",
          "shadow-[0_12px_30px_-14px_rgba(220,38,38,0.8)]",
          "hover:-translate-y-0.5 hover:bg-red-700",
          "hover:shadow-[0_16px_35px_-14px_rgba(220,38,38,0.9)]",
          "focus-visible:ring-red-500",
          "focus-visible:ring-offset-background",
        ],

        outline: [
          ...ctaInteractionClasses,
          "border border-red-600 bg-transparent backdrop-blur-xs text-red-600",
          "hover:-translate-y-0.5 hover:bg-red-600 hover:text-white",
          "focus-visible:ring-red-500",
          "focus-visible:ring-offset-background",
          "dark:border-red-500 dark:text-red-400",
          "dark:hover:text-white",
        ],

        inverse: [
          ...ctaInteractionClasses,
          "border border-white/30 bg-white text-red-700",
          "shadow-[0_12px_30px_-16px_rgba(15,23,42,0.45)]",
          "hover:-translate-y-0.5 hover:bg-red-50",
          "focus-visible:ring-white",
          "focus-visible:ring-offset-red-600",
        ],

        subtle: [
          "rounded-lg font-medium text-foreground/65",
          "transition-colors duration-200",
          "hover:text-red-500",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ],

        inline: [
          "rounded-md font-normal text-inherit",
          "transition-colors duration-200",
          "hover:text-red-500",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ],
      },

      size: {
        icon: "size-10 shrink-0 p-2",
        inline: "p-0 text-sm",
        compact: "px-2 py-1 text-sm",
        default: "min-h-11 px-5 py-2.5 text-sm",
        large: "min-h-12 px-6 py-3 text-sm",
        responsiveIcon: [
          "size-11 p-0 text-base",
          "min-[1180px]:h-auto min-[1180px]:w-auto",
          "min-[1180px]:min-h-11 min-[1180px]:px-5",
          "min-[1180px]:py-2.5 min-[1180px]:text-sm",
        ],
      },

      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "large",
      fullWidth: false,
    },
  },
);

export type ButtonLinkVariantProps = VariantProps<typeof buttonLinkVariants>;
