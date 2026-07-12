"use client";

import React from "react";
import LangSwitcher from "@/app/components/locale/lang-switcher";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";
import HeaderLogo from "@/app/components/layout/header/header-logo";
import MobileMenu from "@/app/components/layout/header/mobile-menu";

export interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({}: HeaderProps) {
  return (
    <header
      className="
    relative isolate overflow-hidden border-b border-black/5
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

        <div className="md:h-8 md:flex md:gap-2 md:align-middle">
          <LangSwitcher />
          <ThemeSwitcher className="hidden md:flex" />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
