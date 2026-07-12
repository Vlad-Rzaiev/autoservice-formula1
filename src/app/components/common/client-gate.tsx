"use client";

import { useEffect, useState } from "react";
import PageLoader from "@/app/components/common/page-loader";

interface ClientGateProps {
  children: React.ReactNode;
}

export default function ClientGate({ children }: ClientGateProps) {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return <PageLoader />;
  }

  return children;
}
