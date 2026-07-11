"use client";

import PageLoader from "@/app/components/page-loader";
import { useEffect, useState } from "react";

interface ClientGateProps {
  children: React.ReactNode;
}

export default function ClientGate({ children }: ClientGateProps) {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
