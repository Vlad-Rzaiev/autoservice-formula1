import clsx from "clsx";
import React from "react";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("mx-auto max-w-7xl px-4 md:px-6 xl:px-8", className)}>
      {children}
    </div>
  );
}
