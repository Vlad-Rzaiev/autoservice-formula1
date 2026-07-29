import { cn } from "@/lib/utils";
import {
  CardGridProps,
  cardGridVariants,
} from "@/app/components/common/card-grid/card-grid-variants";

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
