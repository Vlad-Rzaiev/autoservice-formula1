import { useTranslations } from "next-intl";
import { Section, Container, DevelopmentPlaceholder } from "@/components";

export default function DashboardPage() {
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
