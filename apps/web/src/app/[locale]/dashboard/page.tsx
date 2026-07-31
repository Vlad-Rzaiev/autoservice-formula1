import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import DevelopmentPlaceholder from "@/app/components/common/development-placeholder";

export default function Page() {
  const t = useTranslations();

  return (
    <Section>
      <Container>
        <DevelopmentPlaceholder
          title={t("dashboard.title")}
          description={t("dashboard.dev")}
          linkHref="/"
          linkText={t("dashboard.back-to-main")}
        />
      </Container>
    </Section>
  );
}
