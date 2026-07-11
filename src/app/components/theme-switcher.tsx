"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="p-2 text-2xl inline-block w-[1em] h-[1em]" />;
  }

  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      className="p-2 text-2xl hover:scale-110 transition-transform cursor-pointer bg-transparent hover:bg-transparent"
      onClick={handleThemeToggle}
      aria-label="Toggle theme"
    >
      {isDark ? "☀️" : "🌙"}
    </Button>
  );
}
