"use client";

import { useEffect } from "react";

import { ErrorPage } from "@/components/common";
import { routes } from "@/config";

interface GlobalErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>System error | Formula 1</title>
      </head>

      <body className="m-0">
        <ErrorPage
          eyebrow="System error"
          title="Something went wrong"
          description="An unexpected error has occurred. Please try again or return to the main page."
          retryLabel="Try again"
          onRetry={reset}
          homeLabel="To main page"
          homeHref={routes.marketing.home}
          errorCode={error.digest}
          errorCodeLabel="Error code"
        />
      </body>
    </html>
  );
}
