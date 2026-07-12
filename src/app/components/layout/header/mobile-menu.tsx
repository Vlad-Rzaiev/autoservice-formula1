"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import ThemeSwitcher from "@/app/components/theme/theme-switcher";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right">
      <DrawerTrigger
        render={
          <button
            className="group inline-flex w-8 h-8 items-center justify-center rounded-xl border-border bg-surface transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden cursor-pointer"
            type="button"
            aria-label="open menu"
          >
            <Menu
              className="size-8 text-foreground transition-transform duration-200 group-hover:scale-110 group-focus:scale-110"
              aria-hidden="true"
            />
          </button>
        }
      ></DrawerTrigger>

      <DrawerContent className="w-[85%] max-w-sm">
        <DrawerHeader className="flex-row items-center justify-between border-b border-border p-2">
          <DrawerTitle className="text-xl font-black italic">
            <span>F</span>
            <span className="text-red-500">1</span>
          </DrawerTitle>

          <DrawerClose
            render={
              <button
                type="button"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="close menu"
              />
            }
          >
            <X aria-hidden="true" className="size-5" />
          </DrawerClose>
        </DrawerHeader>

        <nav>
          <ul className="flex flex-1 flex-col items-end gap-5 p-4">
            <li className="flex w-full items-center justify-between">
              <p className="text-base font-semibold tracking-tight text-foreground">
                {t("mobile-menu.theme")}
              </p>
              <ThemeSwitcher />
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
