import { getTranslations } from "next-intl/server";
import { Section, Container } from "@/components/layout";
import { DevelopmentPlaceholder } from "@/components/common";
import { routes } from "@/config";

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
          linkHref={routes.home}
          linkText={t("clients.back-to-main")}
        />
      </Container>
    </Section>
  );
}
