import { useTranslations } from "next-intl";
import { Section, Container, SectionTitle } from "@/components";

export default function MarketingRepairProcess() {
  const t = useTranslations();

  return (
    <Section id="repair-process">
      <Container>
        <SectionTitle>{t("marketing.repair-process.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
