import { getTranslations } from "next-intl/server";

import LoadingState from "@/app/components/states/loading-state";
import Container from "@/app/components/layout/container";
import Section from "@/app/components/layout/section";

export default async function Loading() {
  const t = await getTranslations("services");

  return (
    <Section noTopPadding>
      <Container>
        <LoadingState title={t("servicePage.loading-title")} />
      </Container>
    </Section>
  );
}
