import type { ComponentProps } from "react";

import {
  buttonVariants,
  type ButtonVariantProps,
} from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type ButtonLinkProps = ComponentProps<typeof Link> & ButtonVariantProps;

export default function ButtonLink({
  variant = "ctaPrimary",
  size = "cta-lg",
  fullWidth = false,
  className,
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
        }),
        className,
      )}
      {...linkProps}
    />
  );
}
