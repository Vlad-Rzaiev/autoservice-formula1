import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import {
  navItems,
  navigationItemVariants,
  navigationLinkVariants,
  navigationListVariants,
  NavigationVariant,
  navigationVariants,
} from "@/features/marketing";

export interface MarketingNavigationProps {
  variant?: NavigationVariant;
  onNavigate?: () => void;
  ariaLabel?: string;
}

export default function MarketingNavigation({
  variant = "header",
  onNavigate,
  ariaLabel,
}: MarketingNavigationProps) {
  const t = useTranslations();

  const defaultAriaLabel =
    variant === "footer"
      ? t("marketing.footer.label")
      : t("mobile-menu.navigation.label");

  return (
    <nav
      className={navigationVariants({ variant })}
      aria-label={ariaLabel ?? defaultAriaLabel}
    >
      <ul className={navigationListVariants({ variant })}>
        {navItems.map((item) => (
          <li key={item.href} className={navigationItemVariants({ variant })}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={navigationLinkVariants({ variant })}
            >
              {variant === "footer" && (
                <span
                  aria-hidden="true"
                  className="
                    mr-0 h-px w-0 bg-red-500
                    transition-all duration-200
                    group-hover:mr-2 group-hover:w-4
                    group-focus-visible:mr-2
                    group-focus-visible:w-4
                    motion-reduce:transition-none
                "
                />
              )}

              {variant === "mobile" && (
                <span
                  aria-hidden="true"
                  className="
                    absolute top-1/2 left-0
                    h-7 w-1
                    -translate-y-1/2 scale-y-0
                    rounded-r-full bg-red-500
                    transition-transform duration-200
                    group-hover:scale-y-100
                    group-focus-visible:scale-y-100
                    motion-reduce:transition-none
                  "
                />
              )}

              {variant === "mobile" ? (
                <span
                  className="
                    transition-transform duration-200
                    group-hover:translate-x-1.5
                    group-focus-visible:translate-x-1.5
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  "
                >
                  {t(item.translationKey)}
                </span>
              ) : (
                t(item.translationKey)
              )}

              {variant === "mobile" && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  aria-hidden="true"
                  className="
                    shrink-0 text-lg text-foreground/35
                    transition-all duration-200
                    group-hover:translate-x-1
                    group-hover:text-red-500
                    group-focus-visible:translate-x-1
                    group-focus-visible:text-red-500
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  "
                />
              )}

              {variant === "header" && (
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-x-2.5 bottom-0.5
                    h-0.5 origin-left scale-x-0
                    rounded-full bg-red-500
                    transition-transform duration-200
                    group-hover:scale-x-100
                    group-focus-visible:scale-x-100
                    motion-reduce:transition-none
                "
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
