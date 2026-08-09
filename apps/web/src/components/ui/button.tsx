import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const applicationInteractionClasses = [
  "active:not-aria-[haspopup]:translate-y-px",
] as const;

const ctaInteractionClasses = [
  "rounded-xl font-semibold",
  "focus-visible:ring-offset-2",
  "active:translate-y-0 active:scale-[0.98]",
] as const;

const iconInteractionClasses = [
  "cursor-pointer",
  "hover:-translate-y-0.5",
  "active:translate-y-0 active:scale-95",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
] as const;

export const buttonVariants = cva(
  [
    "group group/button inline-flex shrink-0 items-center justify-center",
    "rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium whitespace-nowrap select-none",
    "outline-none transition-all duration-200",

    "focus-visible:border-ring",
    "focus-visible:ring-2 focus-visible:ring-ring/50",

    "disabled:pointer-events-none disabled:opacity-50",

    "aria-invalid:border-destructive",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50",
    "dark:aria-invalid:ring-destructive/40",

    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",

    "motion-reduce:transform-none",
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        // Application UI
        default: [
          ...applicationInteractionClasses,
          "bg-primary text-primary-foreground",
          "hover:bg-primary/80",
        ],

        outline: [
          ...applicationInteractionClasses,
          "border-border bg-background",
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          "dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        ],

        secondary: [
          ...applicationInteractionClasses,
          "bg-secondary text-secondary-foreground",
          "hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
          "aria-expanded:bg-secondary",
          "aria-expanded:text-secondary-foreground",
        ],

        ghost: [
          ...applicationInteractionClasses,
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          "dark:hover:bg-muted/50",
        ],

        destructive: [
          ...applicationInteractionClasses,
          "bg-destructive/10 text-destructive",
          "hover:bg-destructive/20",
          "focus-visible:border-destructive/40",
          "focus-visible:ring-destructive/20",
          "dark:bg-destructive/20",
          "dark:hover:bg-destructive/30",
          "dark:focus-visible:ring-destructive/40",
        ],

        link: [
          ...applicationInteractionClasses,
          "text-primary underline-offset-4 hover:underline",
        ],

        // Marketing / CTA
        ctaPrimary: [
          ...ctaInteractionClasses,
          "bg-red-600 text-white",
          "shadow-[0_12px_30px_-14px_rgba(220,38,38,0.8)]",
          "hover:-translate-y-0.5",
          "hover:bg-red-700",
          "hover:shadow-[0_16px_35px_-14px_rgba(220,38,38,0.9)]",
          "focus-visible:ring-red-500",
          "focus-visible:ring-offset-background",
        ],

        ctaOutline: [
          ...ctaInteractionClasses,
          "border-red-600 bg-transparent backdrop-blur-xs text-red-600",
          "hover:-translate-y-0.5",
          "hover:bg-red-600 hover:text-white",
          "focus-visible:ring-red-500",
          "focus-visible:ring-offset-background",
          "dark:border-red-500 dark:text-red-400",
          "dark:hover:text-white",
        ],

        ctaInverse: [
          ...ctaInteractionClasses,
          "border-white/30 bg-white text-red-700",
          "shadow-[0_12px_30px_-16px_rgba(15,23,42,0.45)]",
          "hover:-translate-y-0.5",
          "hover:bg-red-50",
          "focus-visible:ring-white",
          "focus-visible:ring-offset-red-600",
        ],

        subtle: [
          "text-foreground/65",
          "hover:text-red-500",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ],

        inline: [
          "rounded-md font-normal text-inherit",
          "hover:text-red-500",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ],

        // Icon-only actions
        iconSurface: [
          ...iconInteractionClasses,
          "rounded-xl",
          "border-border bg-surface text-foreground",
          "shadow-[0_8px_24px_-14px_rgba(15,23,42,0.65)]",
          "hover:border-red-500/40",
          "hover:bg-foreground/5",
          "hover:text-red-500",
        ],

        iconGhost: [
          ...iconInteractionClasses,
          "rounded-lg border-transparent bg-transparent shadow-none",
          "hover:border-transparent",
          "hover:bg-foreground/5",
          "hover:text-red-500",
        ],
      },

      size: {
        // Application buttons
        xs: [
          "h-6 gap-1 px-2 text-xs",
          "rounded-[min(var(--radius-md),10px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5",
          "has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3",
        ],

        sm: [
          "h-7 gap-1 px-2.5 text-[0.8rem]",
          "rounded-[min(var(--radius-md),12px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5",
          "has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ],

        default: [
          "h-8 gap-1.5 px-2.5",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
        ],

        lg: [
          "h-9 gap-1.5 px-2.5",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
        ],

        // Icon buttons
        "icon-xs": [
          "size-6",
          "rounded-[min(var(--radius-md),10px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "[&_svg:not([class*='size-'])]:size-3",
        ],

        "icon-sm": [
          "size-7",
          "rounded-[min(var(--radius-md),12px)]",
          "in-data-[slot=button-group]:rounded-lg",
        ],

        icon: "size-8",

        "icon-lg": "size-9",

        "icon-xl": "size-10",

        "icon-2xl": "size-11",

        // Marketing / links
        inline: "h-auto p-0 text-sm",

        compact: "h-auto px-2 py-1 text-sm",

        cta: "min-h-11 gap-2 px-5 py-2.5 text-sm",

        "cta-lg": "min-h-12 gap-2 px-6 py-3 text-sm",

        "responsive-icon": [
          "size-11 gap-2 p-0 text-base",
          "min-[1180px]:h-auto min-[1180px]:w-auto",
          "min-[1180px]:min-h-11",
          "min-[1180px]:px-5",
          "min-[1180px]:py-2.5",
          "min-[1180px]:text-sm",
        ],
      },

      fullWidth: {
        true: "w-full",
        false: null,
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = "default",
  size = "default",
  fullWidth = false,
  ...props
}: ButtonPrimitive.Props & ButtonVariantProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Button };
