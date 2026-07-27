import { cva } from "class-variance-authority";

export const navigationLinkVariants = cva([
  "group relative inline-flex whitespace-nowrap",
  "rounded-lg px-2.5 py-2",
  "text-sm font-semibold tracking-tight text-foreground/65",
  "transition-colors duration-200",
  "hover:bg-foreground/5 hover:text-foreground",
  "focus-visible:outline-none",
  "focus-visible:ring-2 focus-visible:ring-ring",
  "motion-reduce:transition-none",
]);
