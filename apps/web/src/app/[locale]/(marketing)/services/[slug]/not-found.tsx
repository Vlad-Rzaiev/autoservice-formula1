import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/common";
import { routes } from "@/config";

export default async function NotFound() {
  const t = await getTranslations("services.servicePage");

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
          my-3 max-w-md text-base leading-7
          text-muted-foreground
        "
      >
        {t("not-found-description")}
      </p>

      <ButtonLink href={routes.marketing.services}>
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
      </ButtonLink>
    </div>
  );
}
