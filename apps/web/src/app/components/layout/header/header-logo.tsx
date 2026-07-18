"use client";

import { Link } from "@/i18n/navigation";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      aria-label="main page"
      className="group relative inline-flex h-8 items-center overflow-hidden rounded-xl border border-border bg-foreground px-4 text-background shadow-md transition-all duration-300 hover:shadow-lg active:translate-y-0"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-red-500 transition-all duration-300 group-hover:w-full"
      />

      <span className="relative z-10 flex items-center italic">
        <span className="text-2xl font-black tracking-[-0.12em] transition-colors duration-300 group-hover:text-white">
          F
        </span>

        <span className="ml-1 text-2xl font-black tracking-[-0.08em] text-red-500 transition-colors duration-300 group-hover:text-white">
          1
        </span>

        <span className="ml-3 w-7 flex flex-col gap-1">
          <span className="h-0.5 w-5 rounded-full bg-red-500 transition-all duration-300 group-hover:w-7 group-hover:bg-white" />
          <span className="h-0.5 w-3 rounded-full bg-red-500 transition-all duration-300 group-hover:w-5 group-hover:bg-white" />
        </span>
      </span>
    </Link>
  );
}
