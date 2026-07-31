import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";
import ServicesHero from "@/app/[locale]/(marketing)/services/_components/services-hero";
import ServicesCatalogContainer from "@/app/[locale]/(marketing)/services/_components/services-catalog-container";
import ServicesCta from "@/app/[locale]/(marketing)/services/_components/services-cta";

export default function ServicesPage() {
  const t = useTranslations();

  return (
    <>
      <ServicesHero />

      <Section>
        <Container>
          <SectionTitle className="sr-only">
            {t("services.allServices.title")}
          </SectionTitle>

          <ServicesCatalogContainer />
        </Container>
      </Section>

      <ServicesCta />
    </>
  );
}
