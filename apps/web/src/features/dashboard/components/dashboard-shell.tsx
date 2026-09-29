'use client';

import type { ReactNode } from 'react';
import DashboardSidebar from './dashboard-sidebar';
import DashboardHeader from '@/features/dashboard/components/dashboard-header';

export interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="hidden navigation:fixed navigation:inset-y-0 navigation:left-0 navigation:flex navigation:w-72">
        <DashboardSidebar />
      </div>

      <div className="navigation:pl-72">
        <DashboardHeader />

        <main className="min-h-[calc(100dvh-4.5rem)]">{children}</main>
      </div>
    </div>
  );
}
