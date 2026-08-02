import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const cardGridVariants = cva("grid grid-cols-1", {
  variants: {
    columns: {
      two: "sm:grid-cols-2",
      three: "md:grid-cols-2 xl:grid-cols-3",
      four: "sm:grid-cols-2 xl:grid-cols-4",
    },
    gap: {
      small: "gap-4",
      default: "gap-6",
      large: "gap-8",
    },
  },
  defaultVariants: {
    columns: "three",
    gap: "default",
  },
});

export interface CardGridProps
  extends
    ComponentPropsWithoutRef<"ul">,
    VariantProps<typeof cardGridVariants> {}
