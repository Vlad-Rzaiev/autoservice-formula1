"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeOptions } from "@/i18n/locale-config";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/common";

export interface LangSwitcherProps {
  className?: string;
}

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = useLocale();

  return (
    <div className={cn("flex items-center", className)} role="group">
      {localeOptions.map((language) => {
        const isActive = currentLang === language.code;

        return (
          <IconButton
            key={language.code}
            type="button"
            variant="iconGhost"
            size="icon-lg"
            aria-label={language.label}
            aria-pressed={isActive}
            className={cn(
              "rounded-full p-0",
              isActive
                ? [
                    "border-2 border-border",
                    "-translate-y-0.5",
                    "shadow-md shadow-black/25",
                    "ring-1 ring-black/15",
                    "dark:shadow-white/20",
                    "dark:ring-white/20",
                  ]
                : [
                    "opacity-70",
                    "hover:opacity-100",
                    "hover:shadow-sm",
                    "dark:hover:shadow-white/10",
                  ],
            )}
            onClick={() => {
              if (isActive) {
                return;
              }

              const query = Object.fromEntries(searchParams.entries());

              router.replace(
                {
                  pathname,
                  query,
                },
                {
                  locale: language.code,
                  scroll: false,
                },
              );
            }}
          >
            <Image
              className={cn(
                "rounded-sm transition-transform",
                isActive && "drop-shadow-md",
              )}
              width={24}
              height={24}
              src={`/icons/locale/${language.flag}`}
              alt=""
              loading="eager"
            />
          </IconButton>
        );
      })}
    </div>
  );
}
