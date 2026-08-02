import type { ReactNode } from "react";
import { AuthFooter, AuthHeader, AuthShell } from "@/features";

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
