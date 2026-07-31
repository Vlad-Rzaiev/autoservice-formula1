import BrandLogo from "@/app/components/common/brand-logo/brand-logo";
import LangSwitcher from "@/app/components/locale/lang-switcher";
import React from "react";

export interface AuthFooterProps {
  children?: React.ReactNode;
}

export default function AuthFooter({}: AuthFooterProps) {
  return (
    <footer className="flex gap-3 py-4">
      <BrandLogo variant="footer" />

      <LangSwitcher />
    </footer>
  );
}
