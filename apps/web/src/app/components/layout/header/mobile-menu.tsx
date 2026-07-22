"use client";

import { useEffect } from "react";
import { useMobileMenu } from "@/providers/mobile-menu-provider";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faCalendarCheck,
  faChevronRight,
  faClock,
  faLocationDot,
  faPhoneVolume,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import LangSwitcher from "@/app/components/locale/lang-switcher";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";
import { navItems } from "@/app/components/layout/header/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import HeaderLogo from "@/app/components/layout/header/header-logo";

const desktopBreakpointQuery = "(min-width: 1180px)";

export default function MobileMenu() {
  const { isOpen, setIsOpen, closeMenu } = useMobileMenu();
  const t = useTranslations();

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(desktopBreakpointQuery);

    const handleDesktopBreakpointChange = (
      event: MediaQueryListEvent,
    ): void => {
      if (event.matches) {
        closeMenu();
      }
    };

    desktopMediaQuery.addEventListener("change", handleDesktopBreakpointChange);

    return () => {
      desktopMediaQuery.removeEventListener(
        "change",
        handleDesktopBreakpointChange,
      );
    };
  }, [closeMenu]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right">
      <DrawerTrigger
        render={
          <button
            type="button"
            aria-label={t("mobile-menu.open")}
            aria-expanded={isOpen}
            className="
              group relative inline-flex size-10 cursor-pointer
              items-center justify-center overflow-hidden
              rounded-xl border border-border
              bg-surface text-foreground
              shadow-[0_8px_24px_-14px_rgba(15,23,42,0.65)]
              transition-all duration-200
              hover:-translate-y-0.5
              hover:border-red-500/40
              hover:bg-foreground/5
              hover:text-red-500
              active:translate-y-0
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
            "
          >
            <span
              aria-hidden="true"
              className="
                absolute inset-0
                bg-linear-to-br
                from-red-500/0 to-red-600/0
                transition-colors duration-200
                group-hover:from-red-500/5
                group-hover:to-red-600/10
              "
            />

            <FontAwesomeIcon
              icon={faBarsStaggered}
              aria-hidden="true"
              className="
                relative text-lg
                transition-transform duration-200
                group-hover:scale-110
                group-focus-visible:scale-110
              "
            />
          </button>
        }
      />

      <DrawerContent
        className="
          flex h-dvh w-[92vw] max-w-md
          flex-col gap-0 overflow-hidden
          border-l border-border
          bg-background/95 p-0
          shadow-2xl backdrop-blur-xl
        "
      >
        <DrawerHeader
          className="
            relative flex-row items-center justify-between
            border-b border-border
            px-4 py-3
            sm:px-5
          "
        >
          <DrawerTitle>
            <Link
              href="/"
              onClick={closeMenu}
              aria-label={t("mobile-menu.home")}
              className="
                group inline-flex items-center
                rounded-lg px-1 py-1
                text-2xl font-black italic tracking-tighter
                text-foreground
                transition-transform duration-200
                hover:scale-105
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
            >
              <HeaderLogo />
            </Link>
          </DrawerTitle>

          <DrawerClose
            render={
              <button
                type="button"
                aria-label={t("mobile-menu.close")}
                className="
                  group inline-flex size-10 cursor-pointer
                  items-center justify-center
                  rounded-xl border border-border
                  bg-surface text-foreground
                  shadow-sm
                  transition-all duration-200
                  hover:border-red-500/40
                  hover:bg-foreground/5
                  hover:text-red-500
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  aria-hidden="true"
                  className="
                    text-lg
                    transition-transform duration-200
                    group-hover:rotate-90
                    group-hover:scale-110
                  "
                />
              </button>
            }
          ></DrawerClose>

          <span
            aria-hidden="true"
            className="
              absolute inset-x-0 bottom-0 h-px
              bg-linear-to-r
              from-transparent
              via-red-500/60
              to-transparent
            "
          />
        </DrawerHeader>

        <div
          className="
            flex min-h-0 flex-1 flex-col
            overflow-y-auto overscroll-contain
            px-4 py-5
            sm:px-5
          "
        >
          <div
            className="
              mb-5 rounded-2xl
              border border-border
              bg-foreground/2.5
              p-3.5
              shadow-sm
              dark:bg-white/2.5
            "
          >
            <a
              href={t("marketing.header.contacts.phoneHref")}
              className="
                group flex items-center gap-3
                rounded-xl
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
              "
            >
              <span
                className="
                  inline-flex size-10 shrink-0
                  items-center justify-center
                  rounded-xl bg-red-500/10
                  text-red-500
                  transition-colors duration-200
                  group-hover:bg-red-500
                  group-hover:text-white
                "
              >
                <FontAwesomeIcon
                  icon={faPhoneVolume}
                  aria-hidden="true"
                  className="
                    text-lg
                    animate-phone-ring
                    motion-reduce:animate-none
                  "
                />
              </span>

              <span className="flex min-w-0 flex-col">
                <span className="text-xs font-medium text-foreground/55">
                  {t("mobile-menu.call")}
                </span>

                <span
                  className="
                    truncate text-base font-bold
                    text-foreground
                    transition-colors duration-200
                    group-hover:text-red-500
                  "
                >
                  {t("marketing.header.contacts.phone")}
                </span>
              </span>
            </a>

            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <p
                className="
                  flex items-start gap-2
                  text-sm leading-5 text-foreground/65
                "
              >
                <FontAwesomeIcon
                  icon={faClock}
                  aria-hidden="true"
                  className="mt-0.5 text-lg shrink-0 text-red-500"
                />

                <span>{t("marketing.header.contacts.hours")}</span>
              </p>

              <Link
                href="/#contacts"
                onClick={closeMenu}
                className="
                  flex items-start gap-2
                  rounded-md
                  text-sm leading-5 text-foreground/65
                  transition-colors duration-200
                  hover:text-red-500
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                "
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  aria-hidden="true"
                  className="mt-0.5 text-lg shrink-0 text-red-500"
                />

                <span>{t("marketing.header.contacts.address")}</span>
              </Link>
            </div>
          </div>

          <nav className="mb-6" aria-label={t("mobile-menu.navigation.label")}>
            <ul
              className="
                overflow-hidden rounded-2xl
                border border-border
                bg-surface
              "
            >
              {navItems.map((item) => (
                <li
                  key={item.href}
                  className="border-b border-border last:border-b-0"
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="
                      group relative flex min-h-13 w-full
                      items-center justify-between
                      gap-3 px-4 py-3
                      text-base font-semibold tracking-tight
                      text-foreground/70
                      transition-colors duration-200
                      hover:bg-foreground/5
                      hover:text-foreground
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-ring
                    "
                  >
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
                      "
                    />

                    <span
                      className="
                        transition-transform duration-200
                        group-hover:translate-x-1.5
                        group-focus-visible:translate-x-1.5
                      "
                    >
                      {t(item.translationKey)}
                    </span>

                    <FontAwesomeIcon
                      icon={faChevronRight}
                      aria-hidden="true"
                      className="
                        text-lg shrink-0
                        text-foreground/35
                        transition-all duration-200
                        group-hover:translate-x-1
                        group-hover:text-red-500
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              href="/#booking"
              onClick={closeMenu}
              className="
                inline-flex min-h-12 w-full
                items-center justify-center gap-2
                rounded-xl bg-red-500
                px-4 py-3
                text-base font-bold text-white
                shadow-[0_10px_24px_-12px_rgba(239,68,68,0.9)]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:bg-red-600
                hover:shadow-[0_14px_28px_-12px_rgba(239,68,68,0.95)]
                active:translate-y-0
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
            >
              <FontAwesomeIcon
                icon={faCalendarCheck}
                aria-hidden="true"
                className="text-xl shrink-0"
              />
              {t("marketing.header.actions.booking")}
            </Link>

            <Link
              href="/login"
              onClick={closeMenu}
              className="
                inline-flex min-h-12 w-full
                items-center justify-center gap-2
                rounded-xl border border-border
                bg-surface px-4 py-3
                text-base font-semibold text-foreground
                transition-all duration-200
                hover:border-red-500/40
                hover:bg-foreground/5
                hover:text-red-500
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
            >
              <FontAwesomeIcon
                icon={faRightToBracket}
                aria-hidden="true"
                className="text-xl shrink-0"
              />
              {t("marketing.header.actions.account")}
            </Link>

            <p className="text-center text-sm text-foreground/55">
              {t("mobile-menu.noAccount")}{" "}
              <Link
                href="/register"
                onClick={closeMenu}
                className="
                  font-semibold text-red-500
                  transition-colors duration-200
                  hover:text-red-600
                  hover:underline
                  focus-visible:rounded-sm
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                "
              >
                {t("auth.reg.regBtn")}
              </Link>
            </p>
          </div>
        </div>

        <div
          className="
            shrink-0 border-t border-border
            bg-background/90
            px-4 py-3 backdrop-blur-xl
            sm:px-5
          "
        >
          <div className="flex flex-col gap-3">
            <div className="flex min-h-10 items-center justify-between gap-4">
              <p className="text-sm font-semibold text-foreground/70">
                {t("mobile-menu.language")}
              </p>

              <LangSwitcher />
            </div>

            <div className="flex min-h-10 items-center justify-between gap-4">
              <p className="text-sm font-semibold text-foreground/70">
                {t("mobile-menu.theme")}
              </p>

              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
