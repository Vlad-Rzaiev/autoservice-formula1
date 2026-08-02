import { cn } from "@/lib/utils";
import { cardGridVariants, type CardGridProps } from "@/components";

export default function CardGrid({
  columns,
  gap,
  className,
  children,
  ...listProps
}: CardGridProps) {
  return (
    <ul
      className={cn(
        cardGridVariants({
          columns,
          gap,
        }),
        className,
      )}
      {...listProps}
    >
      {children}
    </ul>
  );
}
