import { useTranslations } from "next-intl";
import { Section, Container, SectionTitle } from "@/components/layout";

export default function MarketingSpecialists() {
  const t = useTranslations();

  return (
    <Section id="specialists">
      <Container>
        <SectionTitle>{t("marketing.specialists.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
