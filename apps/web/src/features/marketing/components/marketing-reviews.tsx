import { getTranslations } from "next-intl/server";
import { Section, Container, SectionTitle } from "@/components/layout";

export default async function MarketingReviews() {
  const t = await getTranslations();

  return (
    <Section id="reviews">
      <Container>
        <SectionTitle>{t("marketing.reviews.title")}</SectionTitle>
      </Container>
    </Section>
  );
}
