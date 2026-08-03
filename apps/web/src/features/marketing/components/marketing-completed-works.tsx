import { useTranslations } from "next-intl";
import { Section, Container, SectionTitle } from "@/components/layout";

export default function MarketingCompletedWorks() {
  const t = useTranslations();

  return (
    <Section id="completed-works">
      <Container>
        <SectionTitle>{t("marketing.completed-works.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
