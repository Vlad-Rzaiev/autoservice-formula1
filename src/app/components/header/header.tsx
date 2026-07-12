import React from "react";
import LangSwitcher from "@/app/components/locale/lang-switcher";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";
import HeaderLogo from "@/app/components/header/header-logo";

export interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({}: HeaderProps) {
  return (
    <header className="py-2 flex justify-between">
      <HeaderLogo />

      <div className="h-8 flex gap-2 align-middle">
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
