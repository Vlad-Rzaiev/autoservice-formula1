import type { ComponentProps } from "react";
import { type VariantProps } from "class-variance-authority";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonLinkVariants } from "@/app/components/common/button-link/button-link-variants";

export type ButtonLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonLinkVariants>;

export default function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        buttonLinkVariants({
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
