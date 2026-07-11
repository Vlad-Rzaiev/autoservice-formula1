"use client";

import LangSwitcher from "@/app/components/lang-switcher";
import ThemeSwitcher from "@/app/components/theme-switcher";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  return (
    <div>
      <main>
        <ThemeSwitcher />
        <LangSwitcher />

        <Button className="inline-flex bg-red-500 cursor-pointer">
          Hello World
        </Button>
      </main>
    </div>
  );
}
