"use client";

import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button
      className="p-2 text-2xl hover:scale-110 transition-transform"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
