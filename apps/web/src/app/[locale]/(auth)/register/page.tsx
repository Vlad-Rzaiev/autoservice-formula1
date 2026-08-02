import { useTranslations } from "next-intl";
import { DevelopmentPlaceholder } from "@/components";

export default function RegisterPage() {
  const t = useTranslations();

  return (
    <DevelopmentPlaceholder
      title={t("auth.reg.title")}
      description={t("auth.reg.dev")}
      linkHref="/"
      linkText={t("auth.reg.back-to-main")}
    />
  );
}
