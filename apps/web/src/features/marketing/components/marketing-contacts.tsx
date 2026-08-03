import { useTranslations } from "next-intl";
import { Section, Container, SectionTitle } from "@/components/layout";

export default function MarketingContacts() {
  const t = useTranslations();

  return (
    <Section id="contacts">
      <Container>
        <SectionTitle>{t("marketing.contacts.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
