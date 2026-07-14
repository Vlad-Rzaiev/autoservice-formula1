"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LangSwitcher from "@/app/components/locale/lang-switcher";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";
import HeaderLogo from "@/app/components/layout/header/header-logo";
import MobileMenu from "@/app/components/layout/header/mobile-menu";
import { navItems } from "@/app/components/layout/header/navigation";

export interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({}: HeaderProps) {
  const t = useTranslations();

  return (
    <header
      className="
    fixed top-0 left-0 right-0 z-50 isolate overflow-hidden border-b border-black/5
    bg-[radial-gradient(circle_at_15%_0%,rgba(239,68,68,0.18),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(241,245,249,0.82))]
    shadow-[0_12px_35px_-20px_rgba(15,23,42,0.45)]
    backdrop-blur-xl
    after:absolute after:inset-x-0 after:bottom-0 after:h-px
    after:bg-linear-to-r after:from-transparent after:via-red-500/70 after:to-transparent
    dark:border-white/10
    dark:bg-[radial-gradient(circle_at_15%_0%,rgba(239,68,68,0.24),transparent_35%),linear-gradient(135deg,rgba(9,9,11,0.94),rgba(24,24,27,0.86))]
  "
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6 xl:px-8">
        <HeaderLogo />

        <div className="hidden md:flex">
          <nav aria-label={t("mobile-menu.navigation.label")}>
            <ul className="flex items-center gap-3 min-[1440px]:gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="
              group relative inline-flex items-center
              px-2 py-2
              text-sm font-medium tracking-tight
              text-foreground/70
              transition-colors duration-200
              hover:text-foreground
              focus-visible:rounded-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              min-[1440px]:px-3
              min-[1440px]:text-base
            "
                  >
                    {t(item.translationKey)}

                    <span
                      aria-hidden="true"
                      className="
                absolute right-2 bottom-1 left-2
                h-0.5 origin-left scale-x-0
                rounded-full bg-red-500
                transition-transform duration-200
                group-hover:scale-x-100
                group-focus-visible:scale-x-100
                min-[1440px]:right-3
                min-[1440px]:left-3
              "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="md:h-8 md:flex md:gap-2 md:align-middle">
          <LangSwitcher />
          <ThemeSwitcher className="hidden md:flex" />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
