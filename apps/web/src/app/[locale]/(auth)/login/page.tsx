import { getTranslations } from "next-intl/server";
import { DevelopmentPlaceholder, ButtonLink } from "@/components/common";
import { routes } from "@/config";

export default async function LoginPage() {
  const t = await getTranslations("auth");

  return (
    <>
      <DevelopmentPlaceholder
        title={t("login.title")}
        description={t("login.dev")}
        linkHref={routes.home}
        linkText={t("login.back-to-main")}
      />

      <div className="mt-8 flex items-center justify-center">
        <ButtonLink
          href="/forgot-password"
          variant="inline"
          className="hover:underline"
        >
          {t("login.forgot-pwd")}
        </ButtonLink>
      </div>
    </>
  );
}
