import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Container from "@/app/components/layout/container";
import styles from "./hero.module.css";

export default function Hero() {
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
        <p className="mt-6 max-w-xl rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-base           font-medium leading-7 text-white shadow-lg backdrop-blur-[3px] md:text-lg md:leading-8">
          {t.rich("marketing.hero.description", {
            accent: (textChunks) => (
              <span className="font-semibold text-red-500">{textChunks}</span>
            ),
          })}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            className="
                inline-flex h-12 items-center justify-center rounded-xl
                bg-red-600 px-6 text-base font-semibold text-white
                shadow-lg shadow-red-950/30
                transition-all duration-200
                hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-xl
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-red-400
                focus-visible:ring-offset-2 focus-visible:ring-offset-black
                active:translate-y-0
    "
            href="/register"
          >
            {t("auth.reg.regBtn")}
          </Link>

          <Link
            className="
                inline-flex h-12 items-center justify-center rounded-xl
                border border-white/25 bg-black/20 px-6
                text-base font-semibold text-white
                shadow-lg backdrop-blur-[3px]
                transition-all duration-200
                hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-white/70
                focus-visible:ring-offset-2 focus-visible:ring-offset-black
                active:translate-y-0
    "
            href="/login"
          >
            {t("auth.login.loginBtn")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
