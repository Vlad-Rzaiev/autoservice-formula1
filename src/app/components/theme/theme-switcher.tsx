"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Switch } from "@/app/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const iconSize = cn(
    "absolute transition-all duration-300",
    "group-data-[size=sm]/switch:size-3",
    "group-data-[size=default]/switch:size-4",
    "group-data-[size=lg]/switch:size-[22px]",
  );

  return (
    <Switch
      className="cursor-pointer"
      size="lg"
      checked={isDark}
      onCheckedChange={handleThemeChange}
      aria-label="Toggle theme"
      thumbContent={
        <>
          <Sun
            aria-hidden="true"
            className={cn(
              iconSize,
              "absolute size-3 text-amber-500 transition-all duration-300",
              "opacity-100 rotate-0 scale-100",
              "group-data-checked/switch:rotate-90",
              "group-data-checked/switch:scale-0",
              "group-data-checked/switch:opacity-0",
            )}
          />

          <Moon
            aria-hidden="true"
            className={cn(
              iconSize,
              "absolute size-3 text-slate-800 transition-all duration-300",
              "-rotate-90 scale-0 opacity-0",
              "group-data-checked/switch:rotate-0",
              "group-data-checked/switch:scale-100",
              "group-data-checked/switch:opacity-100",
            )}
          />
        </>
      }
    />
  );
}
