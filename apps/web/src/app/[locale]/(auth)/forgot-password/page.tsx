import { useTranslations } from "next-intl";
import { DevelopmentPlaceholder } from "@/components";

export default function ForgotPasswordPage() {
  const t = useTranslations();

  return (
    <DevelopmentPlaceholder
      title={t("auth.forgot-pwd.title")}
      description={t("auth.forgot-pwd.dev")}
      linkHref="/"
      linkText={t("auth.forgot-pwd.back-to-main")}
    />
  );
}
