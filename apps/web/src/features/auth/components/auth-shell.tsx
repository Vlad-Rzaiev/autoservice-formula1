import type { ReactNode } from 'react';

export interface AuthShellProps {
  children: ReactNode;
}

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="flex flex-1 items-center justify-center">{children}</main>
  );
}
