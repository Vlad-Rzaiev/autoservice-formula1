import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
  className?: string;
}

export default function AuthShell({ children, className }: AuthShellProps) {
  return (
    <main
      className={cn(
        "flex items-center justify-center bg-background px-4 pb-12 pt-(--marketing-header-height)",
        className,
      )}
    >
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
