import { useTranslations } from "next-intl";
import { Section, Container, DevelopmentPlaceholder } from "@/components";

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
