import { useTranslations } from "next-intl";
import { Section, Container, SectionTitle } from "@/components";

export default function MarketingReviews() {
  const t = useTranslations();

  return (
    <Section id="reviews">
      <Container>
        <SectionTitle>{t("marketing.reviews.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
