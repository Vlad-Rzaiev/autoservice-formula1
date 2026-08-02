"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";

export interface ErrorPageProps {
  eyebrow: string;
  title: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
  homeLabel?: string;
  homeHref?: string;
  errorCode?: string;
  errorCodeLabel?: string;
  className?: string;
}

export default function ErrorPage({
  eyebrow,
  title,
  description,
  retryLabel,
  onRetry,
  homeLabel,
  homeHref,
  errorCode,
  errorCodeLabel = "Error code",
  className,
}: ErrorPageProps) {
  const hasRetryAction = Boolean(onRetry && retryLabel);
  const hasHomeAction = Boolean(homeHref && homeLabel);
  const hasActions = hasRetryAction || hasHomeAction;

  return (
    <main
      className={cn(
        "relative flex min-h-dvh items-center justify-center overflow-hidden",
        "bg-slate-950 px-6 py-12 text-slate-100",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="
          absolute left-1/2 top-0 size-96 -translate-x-1/2
          rounded-full bg-red-500/15 blur-3xl
        "
      />

      <section
        role="alert"
        aria-live="assertive"
        className="
          relative w-full max-w-xl rounded-3xl border border-white/10
          bg-white/5 p-8 text-center shadow-2xl shadow-black/30
          backdrop-blur-xl sm:p-12
        "
      >
        <div
          aria-hidden="true"
          className="
            mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl
            border border-red-400/20 bg-red-500/10 text-red-400
          "
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="shrink-0 text-4xl"
          />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
          {eyebrow}
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
          {description}
        </p>

        {errorCode && (
          <p className="mt-5 font-mono text-xs text-slate-500">
            {errorCodeLabel}: {errorCode}
          </p>
        )}

        {hasActions && (
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {hasRetryAction && (
              <button
                type="button"
                onClick={onRetry}
                className="
                  group inline-flex min-h-11 items-center justify-center gap-2
                  rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold
                  text-white transition hover:bg-red-400
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-red-400 focus-visible:ring-offset-2
                  focus-visible:ring-offset-slate-950 active:scale-[0.98]
                "
              >
                <FontAwesomeIcon
                  aria-hidden="true"
                  icon={faRotateRight}
                  className="
                    shrink-0 text-sm transition-transform duration-300
                    group-hover:rotate-45
                  "
                />

                {retryLabel}
              </button>
            )}

            {hasHomeAction && (
              <a
                href={homeHref}
                className="
                  inline-flex min-h-11 items-center justify-center rounded-xl
                  border border-white/10 bg-white/5 px-6 py-3 text-sm
                  font-semibold text-slate-200 transition
                  hover:border-white/20 hover:bg-white/10
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-slate-400 focus-visible:ring-offset-2
                  focus-visible:ring-offset-slate-950 active:scale-[0.98]
                "
              >
                {homeLabel}
              </a>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
