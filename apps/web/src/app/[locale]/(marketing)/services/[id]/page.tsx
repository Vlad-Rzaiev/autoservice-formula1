import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import ServiceDetails from "@/app/[locale]/(marketing)/services/_components/service-details";

export interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug: serviceSlug } = await params;

  return (
    <Section noTopPadding>
      <Container>
        <ServiceDetails slug={serviceSlug} />
      </Container>
    </Section>
  );
}
