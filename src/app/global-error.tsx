"use client";

import { Link } from "@/i18n/navigation";
import { useEffect } from "react";

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
    <html lang="uk">
      <body className="m-0 bg-slate-950 text-slate-100 antialiased">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red-500/15 blur-3xl"
          />

          <section className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M12 17.01L12.01 16.999"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M10.29 3.86L2.82 17A2 2 0 0 0 4.56 20H19.44A2 2 0 0 0 21.18 17L13.71 3.86A2 2 0 0 0 10.29 3.86Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
              System error
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Something went wrong
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
              An unexpected error has occurred. Please try again or return to
              the main page.
            </p>

            {error.digest && (
              <p className="mt-5 font-mono text-xs text-slate-500">
                Error code: {error.digest}
              </p>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
              >
                Try again
              </button>

              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
              >
                To main page
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
