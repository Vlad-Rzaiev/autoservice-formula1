"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faClock,
  faLocationDot,
  faRightToBracket,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { navItems } from "@/app/[locale]/(marketing)/_components/header/navigation";
import { buttonLinkVariants } from "@/app/components/common/button-link/button-link-variants";

import LangSwitcher from "@/app/components/locale/lang-switcher";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";
import HeaderLogo from "@/app/components/layout/header/header-logo";
import MarketingMobileMenu from "@/app/[locale]/(marketing)/_components/header/marketing-mobile-menu";
import ButtonLink from "@/app/components/common/button-link/button-link";
import { navigationLinkVariants } from "@/app/components/layout/header/navigation-link-variants";

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
          min-[1180px]:block
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
              href={t("marketing.header.contacts.phoneHref")}
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
              <span>{t("marketing.header.contacts.phone")}</span>
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
              href={t("marketing.header.contacts.mapHref")}
              target="_blank"
            >
              <FontAwesomeIcon
                className="text-sm shrink-0"
                icon={faLocationDot}
                aria-hidden="true"
              />
              {t("marketing.header.contacts.address")}
            </a>

            <Link
              href="/login"
              className={buttonLinkVariants({
                variant: "inline",
                size: "inline",
              })}
            >
              <FontAwesomeIcon
                className="text-sm shrink-0"
                icon={faRightToBracket}
                aria-hidden="true"
              />
              {t("marketing.header.actions.account")}
            </Link>
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
        <HeaderLogo />

        <nav
          className="hidden min-[1180px]:block"
          aria-label={t("mobile-menu.navigation.label")}
        >
          <ul className="flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navigationLinkVariants()}>
                  {t(item.translationKey)}

                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-x-2.5 bottom-0.5
                      h-0.5 origin-left scale-x-0
                      rounded-full bg-red-500
                      transition-transform duration-200
                      group-hover:scale-x-100
                      group-focus-visible:scale-x-100
                    "
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 min-[1180px]:flex">
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

        <div className="flex items-center gap-2 min-[1180px]:hidden">
          <a
            href={t("marketing.header.contacts.phoneHref")}
            aria-label={t("marketing.header.contacts.phone")}
            className={buttonLinkVariants({
              variant: "headerControl",
              size: "icon",
            })}
          >
            <FontAwesomeIcon
              className="text-lg shrink-0 animate-phone-ring motion-reduce:animate-none"
              icon={faPhoneVolume}
              aria-hidden="true"
            />
          </a>

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
