"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/providers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faCalendarCheck,
  faClock,
  faLocationDot,
  faPhoneVolume,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  LangSwitcher,
  ThemeSwitcher,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  IconButton,
  buttonLinkVariants,
  ButtonLink,
  BrandLogo,
} from "@/components";
import { MarketingNavigation } from "@/features";
import { siteConfig } from "@/config";

const desktopBreakpointQuery = "(min-width: 1180px)";

export default function MarketingMobileMenu() {
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
          <IconButton aria-label={t("mobile-menu.open")} aria-expanded={isOpen}>
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
          </IconButton>
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
            <BrandLogo variant="mobileMenu" />
          </DrawerTitle>

          <DrawerClose
            render={
              <IconButton aria-label={t("mobile-menu.close")}>
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
              </IconButton>
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
              href={siteConfig.phone.href}
              className={buttonLinkVariants({
                variant: "inline",
                size: "inline",
              })}
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
                  {siteConfig.phone.display}
                </span>
              </span>
            </a>

            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <p
                className={cn(
                  buttonLinkVariants({
                    variant: "inline",
                    size: "inline",
                  }),
                  "hover:bg-transparent hover:text-inherit",
                )}
              >
                <FontAwesomeIcon
                  icon={faClock}
                  aria-hidden="true"
                  className="mt-0.5 text-lg shrink-0 text-red-500"
                />

                <span>{t("marketing.header.contacts.hours")}</span>
              </p>

              <a
                href={siteConfig.address.googleMapsUrl}
                target="_blank"
                onClick={closeMenu}
                className={buttonLinkVariants({
                  variant: "inline",
                  size: "inline",
                })}
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  aria-hidden="true"
                  className="mt-0.5 text-lg shrink-0 text-red-500"
                />

                <span>{siteConfig.address.display}</span>
              </a>
            </div>
          </div>

          <MarketingNavigation variant="mobile" onNavigate={closeMenu} />

          <div className="mt-auto flex flex-col gap-3">
            <ButtonLink href="/#booking" onClick={closeMenu} fullWidth>
              <FontAwesomeIcon
                icon={faCalendarCheck}
                aria-hidden="true"
                className="text-xl shrink-0"
              />
              {t("marketing.header.actions.booking")}
            </ButtonLink>

            <ButtonLink
              href="/login"
              onClick={closeMenu}
              fullWidth
              variant="outline"
            >
              <FontAwesomeIcon
                icon={faRightToBracket}
                aria-hidden="true"
                className="text-xl shrink-0"
              />
              {t("marketing.header.actions.account")}
            </ButtonLink>

            <div className="flex gap items-center justify-center">
              <p className="text-center text-sm text-foreground/55">
                {t("mobile-menu.noAccount")}
              </p>
              <ButtonLink
                href="/register"
                className="hover:underline"
                onClick={closeMenu}
                variant="subtle"
                size="compact"
              >
                {t("auth.reg.regBtn")}
              </ButtonLink>
            </div>
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
