import HeaderLogo from "@/app/components/layout/header/header-logo";
import LangSwitcher from "@/app/components/locale/lang-switcher";
import React from "react";

export interface AuthFooterProps {
  children?: React.ReactNode;
}

export default function AuthFooter({}: AuthFooterProps) {
  return (
    <footer className="flex gap-3 py-4">
      <HeaderLogo />

      <LangSwitcher />
    </footer>
  );
}
