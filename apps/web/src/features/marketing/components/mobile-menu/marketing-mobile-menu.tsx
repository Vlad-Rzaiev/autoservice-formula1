"use client";

import { useEffect } from "react";
import { useMobileMenu } from "@/providers";

import { Drawer, DrawerContent } from "@/components/ui";
import {
  MobileMenuHeader,
  MobileMenuTrigger,
  MobileMenuContactCard,
  MobileMenuActions,
  MobileMenuPreferences,
  MarketingNavigation,
} from "@/features/marketing";

const desktopBreakpointQuery = "(min-width: 1180px)";

export default function MarketingMobileMenu() {
  const { isOpen, setIsOpen, closeMenu } = useMobileMenu();

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(desktopBreakpointQuery);

    const handleDesktopBreakpointChange = (
      event: MediaQueryListEvent,
    ): void => {
      if (event.matches) {
        closeMenu();
      }
    };

    desktopMediaQuery.addEventListener("change", handleDesktopBreakpointChange);

    return () => {
      desktopMediaQuery.removeEventListener(
        "change",
        handleDesktopBreakpointChange,
      );
    };
  }, [closeMenu]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} swipeDirection="right">
      <MobileMenuTrigger isOpen={isOpen} />

      <DrawerContent
        className="
          flex h-dvh w-[92vw] max-w-md
          flex-col gap-0 overflow-hidden
          border-l border-border
          bg-background/95 p-0
          shadow-2xl backdrop-blur-xl
        "
      >
        <MobileMenuHeader />

        <div
          className="
            flex min-h-0 flex-1 flex-col
            overflow-y-auto overscroll-contain
            px-4 py-5
            sm:px-5
          "
        >
          <MobileMenuContactCard onNavigate={closeMenu} />

          <MarketingNavigation variant="mobile" onNavigate={closeMenu} />

          <MobileMenuActions onNavigate={closeMenu} />
        </div>

        <MobileMenuPreferences />
      </DrawerContent>
    </Drawer>
  );
}
