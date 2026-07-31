import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import DevelopmentPlaceholder from "@/app/components/common/development-placeholder";

export default function Page() {
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
