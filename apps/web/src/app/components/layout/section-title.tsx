import React from "react";

export interface SectionTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`flex flex-col items-center gap-4 pt-6 ${className}`}>
      <h2 className="max-w-3xl text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-100">
        {children}
      </h2>

      <span aria-hidden="true" className="h-1 w-16 rounded-full bg-red-600" />
    </div>
  );
}
