import { StateShellVariant } from "@/components";

export const containerVariantClassNames: Record<StateShellVariant, string> = {
  default: ["border-dashed border-border", "bg-surface/50"].join(" "),

  error: ["border-destructive/20", "bg-destructive/5"].join(" "),

  loading: ["border-border", "bg-surface/60"].join(" "),
};

export const iconVariantClassNames: Record<StateShellVariant, string> = {
  default: [
    "border-border",
    "bg-background",
    "text-muted-foreground",
    "shadow-sm",
  ].join(" "),

  error: [
    "border-destructive/20",
    "bg-destructive/10",
    "text-destructive",
  ].join(" "),

  loading: ["border-red-500/20", "bg-red-500/10", "text-red-600"].join(" "),
};
