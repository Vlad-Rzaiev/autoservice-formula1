import { cva, type VariantProps } from "class-variance-authority";

export const iconButtonVariants = cva(
  [
    "group relative inline-flex shrink-0 cursor-pointer",
    "items-center justify-center overflow-hidden",
    "border border-border bg-surface text-foreground",
    "transition-all duration-200",
    "hover:-translate-y-0.5",
    "hover:border-red-500/40",
    "hover:bg-foreground/5",
    "hover:text-red-500",
    "active:translate-y-0 active:scale-95",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "motion-reduce:transform-none",
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-xl",
          "shadow-[0_8px_24px_-14px_rgba(15,23,42,0.65)]",
        ],

        ghost: [
          "rounded-lg border-transparent bg-transparent shadow-none",
          "hover:border-transparent",
        ],
      },

      size: {
        small: "size-9",
        default: "size-10",
        large: "size-11",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>;
