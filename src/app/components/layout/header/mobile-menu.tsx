"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { navItems } from "@/app/components/layout/header/navigation";

const mediumBreakpointQuery = "(min-width: 48rem)";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(mediumBreakpointQuery);

    const closeMenuOnDesktop = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener("change", closeMenuOnDesktop);

    return () => {
      mediaQuery.removeEventListener("change", closeMenuOnDesktop);
    };
  }, []);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right">
      <DrawerTrigger
        render={
          <button
            className="group inline-flex w-8 h-8 items-center justify-center rounded-xl border-border bg-surface transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden cursor-pointer"
            type="button"
            aria-label="open menu"
          >
            <Menu
              className="size-8 text-foreground transition-transform duration-200 group-hover:scale-110 group-focus:scale-110"
              aria-hidden="true"
            />
          </button>
        }
      ></DrawerTrigger>

      <DrawerContent className="w-[85%] max-w-sm flex flex-1 flex-col gap-5 p-4">
        <DrawerHeader className="flex-row items-center justify-between border-b border-border mb-2 p-0 pb-2">
          <DrawerTitle className="text-xl font-black italic">
            <Link
              className="
                group inline-flex items-center
                rounded-lg px-2 py-1
                text-2xl font-black italic tracking-tighter
                text-foreground
                transition-transform duration-200
                hover:scale-105
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
              href="/"
              onClick={closeMenu}
              aria-label={t("mobile-menu.home")}
            >
              <span className="transition-colors duration-200 group-hover:text-foreground/80">
                F
              </span>
              <span className="text-red-500 transition-colors duration-200 group-hover:text-red-600">
                1
              </span>
            </Link>
          </DrawerTitle>

          <DrawerClose
            render={
              <button
                type="button"
                className="
                  group inline-flex size-10 cursor-pointer
                  items-center justify-center
                  rounded-xl border border-border
                  bg-surface text-foreground
                  shadow-sm
                  transition-all duration-200
                  hover:border-red-500/40
                  hover:bg-foreground/5
                  hover:shadow-md
                  active:scale-95
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                  focus-visible:ring-offset-2
                "
                aria-label={t("mobile-menu.close")}
              />
            }
          >
            <X
              aria-hidden="true"
              className="
                size-5
                transition-all duration-200
                group-hover:scale-110
                group-hover:rotate-90
                group-hover:text-red-500
              "
            />
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col  pt-4">
          <div className="flex flex-1 flex-col justify-between mb-6">
            <nav aria-label={t("mobile-menu.navigation.label")}>
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li
                    className="border-b border-border last:border-b-0"
                    key={item.href}
                  >
                    <Link
                      className="
                        group relative flex min-h-12 w-full items-center
                        px-3 py-3
                        text-base font-semibold tracking-tight
                        text-foreground/75
                        transition-colors duration-200
                        hover:bg-foreground/5
                        hover:text-foreground
                        focus-visible:rounded-lg
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-ring
                      "
                      href={item.href}
                      onClick={closeMenu}
                    >
                      <span
                        aria-hidden="true"
                        className="
                          absolute top-1/2 left-0
                          h-6 w-1
                          -translate-y-1/2 scale-y-0
                          rounded-full bg-red-500
                          transition-transform duration-200
                          group-hover:scale-y-100
                          group-focus-visible:scale-y-100
                        "
                      />

                      <span className="transition-transform duration-200 group-hover:translate-x-2 group-focus-visible:translate-x-2"></span>
                      {t(item.translationKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mb-6 flex flex-col gap-3">
            <Link
              className="
                inline-flex min-h-12 w-full items-center justify-center
                rounded-xl border border-border
                bg-surface px-4 py-3
                text-base font-semibold text-foreground
                transition-all duration-200
                hover:border-red-500/50
                hover:bg-foreground/5
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
              href="/login"
            >
              {t("auth.login.loginBtn")}
            </Link>
            <Link
              className="
                inline-flex min-h-12 w-full items-center justify-center
                rounded-xl bg-red-500 px-4 py-3
                text-base font-semibold text-white
                shadow-sm
                transition-all duration-200
                hover:bg-red-600
                hover:shadow-md
                active:scale-[0.98]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
                focus-visible:ring-offset-2
              "
              href="/register"
            >
              {t("auth.reg.regBtn")}
            </Link>
          </div>

          <div className="flex w-full items-center justify-between">
            <p className="text-base font-semibold tracking-tight text-foreground">
              {t("mobile-menu.theme")}
            </p>

            <ThemeSwitcher />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
