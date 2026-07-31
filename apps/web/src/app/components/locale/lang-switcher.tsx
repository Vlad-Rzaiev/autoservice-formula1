"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale } from "next-intl";
import { localeOptions } from "@/i18n/locale-config";
import { cn } from "@/lib/utils";
import { IconButton } from "@/app/components/common/buttons/icon-button/icon-button";

interface LangSwitcherProps {
  className?: string;
}

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();

  return (
    <div className={cn("flex items-center gap", className)} role="group">
      {localeOptions.map((language) => {
        const isActive = currentLang === language.code;

        return (
          <IconButton
            key={language.code}
            type="button"
            variant="ghost"
            size="small"
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

              router.replace(pathname, {
                locale: language.code,
                scroll: false,
              });
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
