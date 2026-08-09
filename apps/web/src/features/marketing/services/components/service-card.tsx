import { Link } from "@/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ServiceIconKey } from "@autoservice/contracts";
import { IconCard } from "@/components/common";
import {
  defaultServiceIcon,
  serviceIconMap,
} from "@/features/marketing/services";
import { routes } from "@/config";

export interface ServiceCardProps {
  slug: string;
  icon: ServiceIconKey;
  title: string;
  description: string;
  actionLabel: string;
}

export default function ServiceCard({
  slug,
  icon,
  title,
  description,
  actionLabel,
}: ServiceCardProps) {
  const serviceIcon = serviceIconMap[icon] ?? defaultServiceIcon;

  return (
    <li
      className="
        group/service relative isolate h-full
        rounded-xl
        before:pointer-events-none
        before:absolute before:inset-2 before:-z-10
        before:rounded-xl before:bg-red-500/20
        before:opacity-0 before:blur-xl
        before:transition-opacity before:duration-300
        hover:before:opacity-100
        focus-within:before:opacity-100
        motion-reduce:before:transition-none
      "
    >
      <Link
        href={routes.marketing.service(slug)}
        className="
          block h-full rounded-xl
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-red-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background
        "
      >
        <IconCard
          icon={serviceIcon}
          title={title}
          description={description}
          className="
            transition-all duration-300
            group-hover/service:-translate-y-1
            group-hover/service:border-red-500/30
            group-hover/service:shadow-lg
            group-focus-within/service:-translate-y-1
            group-focus-within/service:border-red-500/30
            group-focus-within/service:shadow-lg
            motion-reduce:transform-none
            motion-reduce:transition-none
          "
          footer={
            <span className="flex items-center gap-2 font-semibold text-red-500">
              {actionLabel}

              <FontAwesomeIcon
                icon={faArrowRight}
                aria-hidden="true"
                className="
                  text-sm transition-transform duration-200
                  group-hover/service:translate-x-1
                  group-focus-within/service:translate-x-1
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              />
            </span>
          }
        />
      </Link>
    </li>
  );
}
