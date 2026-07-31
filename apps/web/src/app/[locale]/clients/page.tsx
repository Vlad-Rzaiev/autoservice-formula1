import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import DevelopmentPlaceholder from "@/app/components/common/development-placeholder";

export default function AllClientsPage() {
  const t = useTranslations();

  return (
    <Section>
      <Container>
        <DevelopmentPlaceholder
          title={t("clients.title")}
          description={t("clients.dev")}
          linkHref="/"
          linkText={t("clients.back-to-main")}
        />
      </Container>
    </Section>
  );
}
