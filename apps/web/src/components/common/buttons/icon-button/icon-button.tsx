"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { iconButtonVariants, type IconButtonVariantProps } from "@/components";

export interface IconButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    IconButtonVariantProps {
  asChild?: boolean;
  "aria-label": string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { asChild = false, className, variant, size, type = "button", ...props },
    forwardedRef,
  ) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={forwardedRef}
        type={asChild ? undefined : type}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";
