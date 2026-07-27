import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SectionTitle from "@/app/components/layout/section-title";

export default function Page() {
  const t = useTranslations();

  return (
    <>
      <SectionTitle>{t("auth.login.title")}</SectionTitle>
      <p
        className="
                mx-auto my-5 max-w-2xl text-center
                text-lg leading-8 text-muted-foreground
                sm:text-xl sm:leading-9
              "
      >
        {t("auth.login.dev")}
      </p>
      <Link
        href="/"
        className="
                flex mx-auto w-fit min-h-12 items-center justify-center
                gap-2 rounded-xl bg-red-600 px-6 py-3
                text-sm font-semibold text-white
                shadow-[0_14px_34px_-16px_rgba(220,38,38,0.85)]
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-red-700
                active:translate-y-0 active:scale-[0.98]
              "
      >
        {t("auth.login.back-to-main")}
      </Link>
      <Link
        href="/forgot-password"
        className="
              block w-fit text-sm font-medium text-muted-foreground
              underline-offset-4 transition-colors duration-200
              hover:text-red-600 hover:underline
              focus-visible:rounded-sm
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
            "
      >
        {t("auth.login.forgot-pwd")}
      </Link>
    </>
  );
}
