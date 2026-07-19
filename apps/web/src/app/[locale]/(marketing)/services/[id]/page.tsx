import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import ServiceDetails from "@/app/[locale]/(marketing)/services/_components/service-details";

export interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id: serviceId } = await params;

  return (
    <main>
      <Section>
        <Container>
          <ServiceDetails id={serviceId} />
        </Container>
      </Section>
    </main>
  );
}
