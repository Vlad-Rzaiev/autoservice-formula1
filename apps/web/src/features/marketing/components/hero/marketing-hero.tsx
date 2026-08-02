import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Container, ButtonLink } from "@/components";
import styles from "./hero.module.css";

export default function MarketingHero() {
  const t = useTranslations();

  return (
    <section className={cn(styles.hero, "text-white pt-20 lg:pt-30")}>
      <Container>
        <h1
          className="max-w-3xl rounded-2xl border border-white/10
            bg-black/15 px-4 py-4
            text-4xl leading-tight font-black tracking-tight text-white
            shadow-2xl backdrop-blur-xs
            drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]
            md:px-6 md:py-5 md:text-5xl
            lg:text-6xl"
        >
          {t.rich("marketing.hero.title", {
            accent: (textChunks) => (
              <span className="text-red-600">{textChunks}</span>
            ),
          })}
        </h1>
        <p className="mt-6 max-w-xl rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-base font-medium leading-7 text-white shadow-lg backdrop-blur-[3px] md:text-lg md:leading-8">
          {t.rich("marketing.hero.description", {
            accent: (textChunks) => (
              <span className="font-semibold text-red-500">{textChunks}</span>
            ),
          })}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink
            href="/register"
            variant="primary"
            fullWidth
            className="sm:w-auto"
          >
            {t("auth.reg.regBtn")}
          </ButtonLink>

          <ButtonLink
            href="/login"
            variant="outline"
            fullWidth
            className="sm:w-auto"
          >
            {t("auth.login.loginBtn")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
