import { useTranslations } from "next-intl";
import { Section, Container, DevelopmentPlaceholder } from "@/components";

export default function BookingPage() {
  const t = useTranslations();

  return (
    <Section noTopPadding>
      <Container>
        <DevelopmentPlaceholder
          title={t("booking.title")}
          description={t("booking.dev")}
          linkHref="/"
          linkText={t("booking.back-to-main")}
        />
      </Container>
    </Section>
  );
}
