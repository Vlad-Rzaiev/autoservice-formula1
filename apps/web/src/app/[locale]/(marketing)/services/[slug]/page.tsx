import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import ServiceDetails from "@/app/[locale]/(marketing)/services/_components/service-details";

export interface ServicePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  return (
    <Section noTopPadding>
      <Container>
        <ServiceDetails serviceSlug={slug} />
      </Container>
    </Section>
  );
}
