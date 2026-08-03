import { useTranslations } from "next-intl";
import { Section, Container, SectionTitle } from "@/components/layout";

export default function MarketingWarranty() {
  const t = useTranslations();

  return (
    <Section id="warranty">
      <Container>
        <SectionTitle>{t("marketing.warranty.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
