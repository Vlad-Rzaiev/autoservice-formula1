"use client";

import { useTheme } from "next-themes";
import useMounted from "@/hooks/useMounted";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { Switch } from "@/app/components/ui/switch";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const mounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={cn("inline-block h-8 w-14 shrink-0", className)}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleThemeChange = (checked: boolean): void => {
    setTheme(checked ? "dark" : "light");
  };

  const iconSize = cn(
    "absolute shrink-0 transition-all duration-300",
    "group-data-[size=sm]/switch:text-xs",
    "group-data-[size=default]/switch:text-sm",
    "group-data-[size=lg]/switch:text-base",
  );

  return (
    <Switch
      size="lg"
      checked={isDark}
      onCheckedChange={handleThemeChange}
      aria-label="Change theme"
      className={cn("cursor-pointer", className)}
      thumbContent={
        <>
          <FontAwesomeIcon
            icon={faMoon}
            aria-hidden="true"
            className={cn(
              iconSize,
              "text-slate-800",
              "rotate-0 scale-100 opacity-100",
              "group-data-checked/switch:rotate-90",
              "group-data-checked/switch:scale-0",
              "group-data-checked/switch:opacity-0",
            )}
          />

          <FontAwesomeIcon
            icon={faSun}
            aria-hidden="true"
            className={cn(
              iconSize,
              "text-amber-500",
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
