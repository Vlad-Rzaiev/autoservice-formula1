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

const mediumBreakpointQuery = "(min-width: 48rem)";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();

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

  const navItems = [
    { href: "#features", label: t("mobile-menu.navigation.features") },
    { href: "#workflow", label: t("mobile-menu.navigation.workflow") },
    { href: "#roles", label: t("mobile-menu.navigation.roles") },
    { href: "#faq", label: t("mobile-menu.navigation.faq") },
  ];

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
            <span>F</span>
            <span className="text-red-500">1</span>
          </DrawerTitle>

          <DrawerClose
            render={
              <button
                type="button"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="close menu"
              />
            }
          >
            <X aria-hidden="true" className="size-5" />
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col justify-between">
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col">
            <Link href="/login">{t("auth.login.loginBtn")}</Link>
            <Link href="/register">{t("auth.reg.regBtn")}</Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-base font-semibold tracking-tight text-foreground">
            {t("mobile-menu.theme")}
          </p>

          <ThemeSwitcher />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
