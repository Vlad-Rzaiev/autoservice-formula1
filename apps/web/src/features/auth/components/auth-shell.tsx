import type { ReactNode } from 'react';

export interface AuthShellProps {
  children: ReactNode;
}

export default function AuthShell({ children }: AuthShellProps) {
  return <main>{children}</main>;
}
