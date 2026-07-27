import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("services.servicePage");

  return (
    <div
      className="
        mx-auto my-10 flex min-h-80 max-w-2xl
        flex-col items-center justify-center
        rounded-3xl border border-border
        bg-surface/60 px-6 py-12
        text-center shadow-sm
        sm:px-10
      "
    >
      <div
        aria-hidden="true"
        className="
          relative flex size-16 items-center justify-center
          rounded-2xl border border-red-500/20
          bg-red-500/10 text-red-600
        "
      >
        <span
          className="
            absolute inset-2 rounded-xl
            bg-red-500/5
          "
        />

        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="relative shrink-0 text-2xl"
        />
      </div>

      <h1
        className="
          mt-6 text-2xl font-bold tracking-tight
          text-foreground sm:text-3xl
        "
      >
        {t("not-found-title")}
      </h1>

      <p
        className="
          mt-3 max-w-md text-base leading-7
          text-muted-foreground
        "
      >
        {t("not-found-description")}
      </p>

      <Link
        href="/services"
        className="
          group mt-7 inline-flex min-h-11
          items-center justify-center gap-2
          rounded-xl bg-red-600 px-5 py-2.5
          text-sm font-semibold text-white
          shadow-[0_12px_30px_-14px_rgba(220,38,38,0.8)]
          transition-all duration-200
          hover:-translate-y-0.5
          hover:bg-red-700
          active:translate-y-0
          active:scale-[0.98]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-red-500
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background
        "
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          aria-hidden="true"
          className="
            shrink-0 text-sm
            transition-transform duration-200
            group-hover:-translate-x-1
          "
        />

        {t("back-to-services")}
      </Link>
    </div>
  );
}
