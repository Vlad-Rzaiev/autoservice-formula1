import { useTranslations } from "next-intl";
import { DevelopmentPlaceholder, ButtonLink } from "@/components";

export default function LoginPage() {
  const t = useTranslations();

  return (
    <>
      <DevelopmentPlaceholder
        title={t("auth.login.title")}
        description={t("auth.login.dev")}
        linkHref="/"
        linkText={t("auth.login.back-to-main")}
      />

      <div className="mt-8 flex items-center justify-center">
        <ButtonLink
          href="/forgot-password"
          variant="inline"
          className="hover:underline"
        >
          {t("auth.login.forgot-pwd")}
        </ButtonLink>
      </div>
    </>
  );
}
