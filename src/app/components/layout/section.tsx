import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type SectionProps = ComponentPropsWithoutRef<"section">;

export default function Section({
  children,
  className,
  ...sectionProps
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-20 lg:py-24", className)}
      {...sectionProps}
    >
      {children}
    </section>
  );
}
