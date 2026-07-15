"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const lang = [
  {
    code: "pl",
    label: "PL",
    flag: "pl.svg",
  },
  {
    code: "en",
    label: "EN",
    flag: "uk.svg",
  },
  {
    code: "uk",
    label: "UA",
    flag: "ua.svg",
  },
] as const;

interface LangSwitcherProps {
  className?: string;
}

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const router = useRouter();
  const pathName = usePathname();
  const currentLang = useLocale();

  return (
    <div className={cn("flex flex-col gap-2 w-25", className)}>
      <div className=" flex flex-row gap 2">
        {lang.map((language) => {
          const isActive = currentLang === language.code;

          return (
            <Button
              className={clsx(
                "relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 cursor-pointer p-0",
                isActive
                  ? [
                      "border-2 border-border",
                      "shadow-md shadow-black/25 dark:shadow-white/20",
                      "ring-1 ring-black/15 dark:ring-white/20",
                      "-translate-y-0.5",
                    ]
                  : [
                      "opacity-70",
                      "hover:opacity-100",
                      "hover:shadow-sm dark:hover:shadow-white/10",
                    ],
              )}
              key={language.code}
              type="button"
              aria-current={isActive ? "true" : undefined}
              onClick={() =>
                router.replace(pathName, {
                  locale: language.code,
                  scroll: false,
                })
              }
            >
              <Image
                className={clsx(
                  "rounded-sm transition-transform",
                  isActive && "drop-shadow-md",
                )}
                width={24}
                height={24}
                src={`/icons/locale/${language.flag}`}
                alt={language.label}
                loading="eager"
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
