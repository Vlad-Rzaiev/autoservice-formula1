import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faClock,
  faLocationDot,
  faRightToBracket,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config";

import { MarketingNavigation, MarketingMobileMenu } from "@/features";
import {
  buttonLinkVariants,
  LangSwitcher,
  ThemeSwitcher,
  ButtonLink,
  IconButton,
  BrandLogo,
} from "@/components";

export default function MarketingHeader() {
  const t = useTranslations();

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-black/5
        bg-background/90
        shadow-[0_12px_35px_-24px_rgba(15,23,42,0.55)]
        backdrop-blur-xl
        dark:border-white/10
      "
    >
      <div
        className="
          hidden border-b border-border/70
          bg-foreground/2.5
          navigation:block
          dark:bg-white/2.5
        "
      >
        <div
          className="
            mx-auto flex h-9 w-full max-w-7xl
            items-center justify-between
            px-8
            text-xs font-medium text-foreground/65
          "
        >
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.phone.href}
              className={buttonLinkVariants({
                variant: "inline",
                size: "inline",
              })}
            >
              <FontAwesomeIcon
                className="text-sm shrink-0 animate-phone-ring motion-reduce:animate-none"
                icon={faPhoneVolume}
                aria-hidden="true"
              />
              <span>{siteConfig.phone.display}</span>
            </a>

            <span className="inline-flex items-center gap-2 rounded-md font-normal text-inherit">
              <FontAwesomeIcon
                className="text-sm shrink-0"
                icon={faClock}
                aria-hidden="true"
              />
              {t("marketing.header.contacts.hours")}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              className={buttonLinkVariants({
                variant: "inline",
                size: "inline",
              })}
              href={siteConfig.address.googleMapsUrl}
              target="_blank"
            >
              <FontAwesomeIcon
                className="text-sm shrink-0"
                icon={faLocationDot}
                aria-hidden="true"
              />
              {siteConfig.address.display}
            </a>

            <ButtonLink href="/login" variant="subtle" size="compact">
              <FontAwesomeIcon
                className="text-sm shrink-0"
                icon={faRightToBracket}
                aria-hidden="true"
              />
              {t("marketing.header.actions.account")}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        className="
          relative mx-auto flex min-h-18 w-full max-w-7xl
          items-center justify-between
          gap-4 px-4 py-3
          md:px-6
          xl:px-8
        "
      >
        <BrandLogo variant="header" />

        <MarketingNavigation variant="header" />

        <div className="hidden items-center gap-2 navigation:flex">
          <LangSwitcher />

          <ThemeSwitcher />

          <ButtonLink href="/#booking">
            <FontAwesomeIcon
              className="text-lg shrink-0"
              icon={faCalendarCheck}
              aria-hidden="true"
            />
            {t("marketing.header.actions.booking")}
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2 navigation:hidden">
          <IconButton
            asChild
            aria-label={siteConfig.phone.display}
            className="navigation:hidden"
          >
            <a
              href={siteConfig.phone.href}
              aria-label={siteConfig.phone.display}
            >
              <FontAwesomeIcon
                className="text-lg shrink-0 animate-phone-ring motion-reduce:animate-none"
                icon={faPhoneVolume}
                aria-hidden="true"
              />
            </a>
          </IconButton>

          <div className="hidden sm:block">
            <LangSwitcher />
          </div>

          <MarketingMobileMenu />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          h-px bg-linear-to-r
          from-transparent
          via-red-500/70
          to-transparent
        "
      />
    </header>
  );
}
