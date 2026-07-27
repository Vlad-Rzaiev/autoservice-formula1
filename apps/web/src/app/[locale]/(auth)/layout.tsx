import type { ReactNode } from "react";

import AuthShell from "@/app/[locale]/(auth)/_components/auth-shell";
import AuthHeader from "@/app/[locale]/(auth)/_components/auth-header";
import AuthFooter from "@/app/[locale]/(auth)/_components/auth-footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh">
      <AuthHeader />
      <AuthShell className="flex-1">{children}</AuthShell>
      <AuthFooter />
    </div>
  );
}
