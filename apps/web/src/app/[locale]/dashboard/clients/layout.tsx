import React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

export default function ClientsLayout({ children }: LayoutProps) {
  return <main className="pt-(--marketing-header-height)">{children}</main>;
}
