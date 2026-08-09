"use client";

import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib";
import { siteConfig } from "@/config";
import { buttonVariants } from "@/components/ui";

export interface MobileMenuContactCardProps {
  onNavigate: () => void;
}

export default function MobileMenuContactCard({
  onNavigate,
}: MobileMenuContactCardProps) {
  const t = useTranslations();

  return (
    <div
      className="
        mb-5 rounded-2xl
        border border-border
        bg-foreground/2.5
        p-3.5
        shadow-sm
        dark:bg-white/2.5
      "
    >
      <a
        href={siteConfig.phone.href}
        className={cn(
          buttonVariants({
            variant: "inline",
            size: "inline",
          }),
        )}
      >
        <span
          className="
            mr-2 inline-flex size-10 shrink-0
            items-center justify-center
            rounded-xl bg-red-500/10
            text-red-500
            transition-colors duration-200
            group-hover:bg-red-500
            group-hover:text-white
          "
        >
          <FontAwesomeIcon
            icon={faPhoneVolume}
            aria-hidden="true"
            className="
              text-lg
              animate-phone-ring
              motion-reduce:animate-none
            "
          />
        </span>

        <span className="flex min-w-0 flex-col">
          <span className="text-xs font-medium text-foreground/55">
            {t("mobile-menu.call")}
          </span>

          <span
            className="
              truncate text-base font-bold
              text-foreground
              transition-colors duration-200
              group-hover:text-red-500
            "
          >
            {siteConfig.phone.display}
          </span>
        </span>
      </a>

      <div className="mt-3 space-y-2 border-t border-border pt-3">
        <p
          className={cn(
            buttonVariants({
              variant: "inline",
              size: "inline",
            }),
            "hover:bg-transparent hover:text-inherit",
          )}
        >
          <FontAwesomeIcon
            icon={faClock}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-lg text-red-500"
          />

          <span>{t("marketing.header.contacts.hours")}</span>
        </p>

        <a
          href={siteConfig.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className={cn(
            buttonVariants({
              variant: "inline",
              size: "inline",
            }),
          )}
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-lg text-red-500"
          />

          <span>{siteConfig.address.display}</span>
        </a>
      </div>
    </div>
  );
}
