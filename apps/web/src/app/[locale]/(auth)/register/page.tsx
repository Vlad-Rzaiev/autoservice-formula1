import { getTranslations } from "next-intl/server";
import { DevelopmentPlaceholder } from "@/components/common";
import { routes } from "@/config";

export default async function RegisterPage() {
  const t = await getTranslations("auth");

  return (
    <DevelopmentPlaceholder
      title={t("reg.title")}
      description={t("reg.dev")}
      linkHref={routes.marketing.home}
      linkText={t("reg.back-to-main")}
    />
  );
}
