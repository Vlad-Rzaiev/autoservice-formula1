"use client";

import { CalendarDays, Clock3, LogIn, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import LangSwitcher from "@/app/components/locale/lang-switcher";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";
import HeaderLogo from "@/app/components/layout/header/header-logo";
import MobileMenu from "@/app/components/layout/header/mobile-menu";
import { navItems } from "@/app/components/layout/header/navigation";

export default function Header() {
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
              className="
                inline-flex items-center gap-2
                transition-colors duration-200
                hover:text-red-500
                focus-visible:rounded-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
              "
            >
              <Phone
                className="size-3.5 animate-phone-ring motion-reduce:animate-none"
                aria-hidden="true"
              />
              <span>{t("marketing.header.contacts.phone")}</span>
            </a>

            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {t("marketing.header.contacts.hours")}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              className="inline-flex items-center gap-2
                transition-colors duration-200
                hover:text-red-500
                focus-visible:rounded-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring"
              href={t("marketing.header.contacts.mapHref")}
              target="_blank"
            >
              <MapPin className="size-3.5" aria-hidden="true" />
              {t("marketing.header.contacts.address")}
            </a>

            <Link
              href="/login"
              className="
                inline-flex items-center gap-2
                font-semibold text-foreground/75
                transition-colors duration-200
                hover:text-red-500
                focus-visible:rounded-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
              "
            >
              <LogIn className="size-3.5" aria-hidden="true" />
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
                <Link
                  href={item.href}
                  className="
                    group relative inline-flex
                    whitespace-nowrap rounded-lg
                    px-2.5 py-2
                    text-sm font-semibold tracking-tight
                    text-foreground/65
                    transition-colors duration-200
                    hover:bg-foreground/5
                    hover:text-foreground
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                  "
                >
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

          <Link
            href="/#booking"
            className="
              ml-1 inline-flex min-h-10 items-center justify-center
              gap-2 whitespace-nowrap
              rounded-xl bg-red-500 px-4
              text-sm font-bold text-white
              shadow-[0_8px_20px_-10px_rgba(239,68,68,0.9)]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:bg-red-600
              hover:shadow-[0_12px_24px_-10px_rgba(239,68,68,0.95)]
              active:translate-y-0
              active:scale-[0.98]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
            "
          >
            <CalendarDays className="size-4" aria-hidden="true" />
            {t("marketing.header.actions.booking")}
          </Link>
        </div>

        <div className="flex items-center gap-2 min-[1180px]:hidden">
          <a
            href={t("marketing.header.contacts.phoneHref")}
            aria-label={t("marketing.header.contacts.phone")}
            className="
              inline-flex size-9 items-center justify-center
              rounded-xl border border-border
              bg-surface text-foreground
              transition-colors duration-200
              hover:-translate-y-0.5
              hover:bg-foreground/5
              hover:border-red-500/40
              hover:text-red-500
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          >
            <Phone
              className="size-4.5 animate-phone-ring motion-reduce:animate-none"
              aria-hidden="true"
            />
          </a>

          <div className="hidden sm:block">
            <LangSwitcher />
          </div>

          <MobileMenu />
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
