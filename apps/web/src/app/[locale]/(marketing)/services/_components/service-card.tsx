"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  defaultServiceIcon,
  serviceIconMap,
} from "@/app/[locale]/(marketing)/services/lib/service-icon-map";
import { Link } from "@/i18n/navigation";

export interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({
  id,
  icon,
  title,
  description,
}: ServiceCardProps) {
  const serviceIcon = serviceIconMap[icon] ?? defaultServiceIcon;

  return (
    <li
      className="
        group relative flex min-h-64 flex-col overflow-hidden
        rounded-2xl border border-border bg-surface p-6
        shadow-sm transition-all duration-300
        hover:-translate-y-1
        hover:border-red-500/40
        hover:shadow-[0_20px_45px_-24px_rgba(220,38,38,0.45)]
        sm:p-7
    "
    >
      <Link href={`/services/${id}`}>
        <span
          aria-hidden="true"
          className="
            absolute inset-x-0 top-0 h-1
            origin-left scale-x-0 bg-red-600
            transition-transform duration-300
            group-hover:scale-x-100
            "
        />
        <span
          aria-hidden="true"
          className="
            absolute -right-20 -top-20 size-44 rounded-full
            bg-red-500/0 blur-3xl
            transition-colors duration-300
            group-hover:bg-red-500/10
            "
        />

        <div
          className="
            relative flex size-12 items-center justify-center
            rounded-xl border border-red-500/20
            bg-red-500/10 text-red-600
            transition-all duration-300
            group-hover:scale-105
            group-hover:border-red-500
            group-hover:bg-red-600
            group-hover:text-white
            dark:group-hover:text-white
            "
        >
          <FontAwesomeIcon
            icon={serviceIcon}
            aria-hidden="true"
            className="shrink-0 text-2xl"
          />
        </div>

        <div className="relative mt-7">
          <h3
            className="
            text-xl font-semibold tracking-tight text-foreground
            transition-colors duration-300
            group-hover:text-red-600
            dark:group-hover:text-red-400
        "
          >
            {title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </Link>
    </li>
  );
}
