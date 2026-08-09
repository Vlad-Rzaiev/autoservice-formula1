import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  brandLogoContentVariants,
  brandLogoVariants,
  type BrandLogoVariant,
} from "@/components/common";
import { routes } from "@/config";

export interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  onNavigate?: () => void;
}

export default function BrandLogo({
  variant = "header",
  className,
  onNavigate,
}: BrandLogoProps) {
  const t = useTranslations("marketing.brand");

  return (
    <Link
      href={routes.marketing.home}
      aria-label={t("homeLabel")}
      onClick={onNavigate}
      className={cn(brandLogoVariants({ variant }), className)}
    >
      <span
        aria-hidden="true"
        className="
          absolute inset-y-0 left-0 w-1
          bg-red-500
          transition-all duration-300
          group-hover:w-full
          motion-reduce:transition-none
        "
      />

      <span className={brandLogoContentVariants({ variant })}>
        <span
          className="
            font-black tracking-[-0.12em]
            transition-colors duration-300
            group-hover:text-white
            motion-reduce:transition-none
          "
        >
          F
        </span>

        <span
          className="
            ml-1 font-black tracking-[-0.08em]
            text-red-500
            transition-colors duration-300
            group-hover:text-white
            motion-reduce:transition-none
          "
        >
          1
        </span>

        <span className="ml-3 flex w-7 flex-col gap-1">
          <span
            className="
              h-0.5 w-5 rounded-full bg-red-500
              transition-all duration-300
              group-hover:w-7 group-hover:bg-white
              motion-reduce:transition-none
            "
          />

          <span
            className="
              h-0.5 w-3 rounded-full bg-red-500
              transition-all duration-300
              group-hover:w-5 group-hover:bg-white
              motion-reduce:transition-none
            "
          />
        </span>
      </span>
    </Link>
  );
}
