import { getTranslations } from "next-intl/server";
import { Section, Container, DevelopmentPlaceholder } from "@/components";

interface ClientPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params;
  const t = await getTranslations();

  return (
    <Section>
      <Container>
        <DevelopmentPlaceholder
          id={id}
          title={t("clients.client.title")}
          description={t("clients.dev")}
          linkHref="/"
          linkText={t("clients.back-to-main")}
        />
      </Container>
    </Section>
  );
}
