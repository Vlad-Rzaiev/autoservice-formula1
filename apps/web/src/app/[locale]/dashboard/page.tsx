import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";
import SectionTitle from "@/app/components/layout/section-title";

export default function Page() {
  const t = useTranslations();

  return (
    <main>
      <Section>
        <Container>
          <SectionTitle>{t("dashboard.title")}</SectionTitle>
          <p
            className="
                mx-auto my-5 max-w-2xl text-center
                text-lg leading-8 text-muted-foreground
                sm:text-xl sm:leading-9
              "
          >
            {t("dashboard.dev")}
          </p>

          <Link
            href="/"
            className="
                flex mx-auto w-fit min-h-12 items-center justify-center
                gap-2 rounded-xl bg-red-600 px-6 py-3
                text-sm font-semibold text-white
                shadow-[0_14px_34px_-16px_rgba(220,38,38,0.85)]
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-red-700
                active:translate-y-0 active:scale-[0.98]
              "
          >
            {t("dashboard.back-to-main")}
          </Link>
        </Container>
      </Section>
    </main>
  );
}
