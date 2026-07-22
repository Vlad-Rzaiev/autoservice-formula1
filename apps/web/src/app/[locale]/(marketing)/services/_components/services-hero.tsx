import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCarSide,
  faClipboardCheck,
  faMagnifyingGlassChart,
  faPhoneVolume,
  faScrewdriverWrench,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import Section from "@/app/components/layout/section";
import Container from "@/app/components/layout/container";

interface ServicesHeroProps {
  servicesCount?: number;
}

type BenefitTranslationKey = "diagnostics" | "approval" | "warranty";

interface BenefitItem {
  translationKey: BenefitTranslationKey;
  icon: IconDefinition;
}

const benefits = [
  {
    translationKey: "diagnostics",
    icon: faMagnifyingGlassChart,
  },
  {
    translationKey: "approval",
    icon: faClipboardCheck,
  },
  {
    translationKey: "warranty",
    icon: faShieldHalved,
  },
] as const satisfies readonly BenefitItem[];

export default function ServicesHero({ servicesCount }: ServicesHeroProps) {
  const t = useTranslations("services.allServices.hero");

  return (
    <Section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="
          absolute -right-32 -top-40 size-96 rounded-full
          bg-red-600/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute -bottom-48 -left-40 size-96 rounded-full
          bg-red-600/5 blur-3xl
        "
      />

      <Container className="pt-6">
        <div
          className="
            relative grid items-center gap-12
            lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]
            lg:gap-16
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                border border-red-500/20 bg-red-500/10
                px-4 py-2 text-sm font-semibold text-red-600
                dark:text-red-400
              "
            >
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                aria-hidden="true"
                className="shrink-0 text-sm"
              />

              {t("eyebrow")}
            </div>

            <h1
              className="
                mt-6 text-4xl font-bold tracking-tight text-foreground
                sm:text-5xl lg:text-6xl lg:leading-[1.08]
              "
            >
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="text-red-600 dark:text-red-500">
                    {chunks}
                  </span>
                ),
              })}
            </h1>

            <p
              className="
                mt-6 max-w-2xl text-base leading-7 text-muted-foreground
                sm:text-lg sm:leading-8
              "
            >
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={t("phoneHref")}
                className="
                  group inline-flex min-h-12 items-center justify-center
                  gap-2 rounded-xl bg-red-600 px-6 py-3
                  text-sm font-semibold text-white
                  shadow-[0_14px_34px_-16px_rgba(220,38,38,0.85)]
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-red-700
                  active:translate-y-0 active:scale-[0.98]
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-red-500
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                {t("call")}

                <FontAwesomeIcon
                  icon={faPhoneVolume}
                  aria-hidden="true"
                  className="
                    shrink-0 text-base
                    animate-phone-ring
                    motion-reduce:animate-none
                  "
                />
              </a>

              <Link
                href="/booking"
                className="
                  inline-flex min-h-12 items-center justify-center
                  gap-2 rounded-xl border border-border bg-background
                  px-6 py-3 text-sm font-semibold text-foreground
                  transition-all duration-200
                  hover:border-red-500/40 hover:bg-red-500/5
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-red-500
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  aria-hidden="true"
                  className="shrink-0 text-base"
                />

                {t("booking")}
              </Link>
            </div>

            {typeof servicesCount === "number" && servicesCount > 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                {t("services-count", {
                  count: servicesCount,
                })}
              </p>
            )}
          </div>

          <div
            className="
              relative overflow-hidden rounded-3xl
              border border-border bg-surface p-6
              shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)]
              sm:p-8
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute -right-12 -top-16 size-48
                rounded-full bg-red-600/10 blur-3xl
              "
            />

            <div
              className="
                relative flex min-h-52 items-center justify-center
                overflow-hidden rounded-2xl
                border border-red-500/15 bg-red-500/5
              "
            >
              <div
                className="
                  absolute size-48 rounded-full
                  border border-red-500/10
                "
              />

              <div
                className="
                  absolute size-32 rounded-full
                  border border-red-500/20
                "
              />

              <div
                className="
                  flex size-20 items-center justify-center
                  rounded-2xl bg-red-600 text-white
                  shadow-[0_20px_45px_-18px_rgba(220,38,38,0.9)]
                "
              >
                <FontAwesomeIcon
                  icon={faCarSide}
                  aria-hidden="true"
                  className="shrink-0 text-4xl"
                />
              </div>
            </div>

            <ul className="relative mt-6 space-y-3">
              {benefits.map((benefit) => {
                return (
                  <li
                    key={benefit.translationKey}
                    className="
                      flex items-center gap-4 rounded-xl
                      border border-border bg-background/70
                      px-4 py-3
                    "
                  >
                    <div
                      className="
                        flex size-10 shrink-0 items-center justify-center
                        rounded-lg bg-red-500/10 text-red-600
                        dark:text-red-400
                      "
                    >
                      <FontAwesomeIcon
                        icon={benefit.icon}
                        aria-hidden="true"
                        className="shrink-0 text-lg"
                      />
                    </div>

                    <span className="text-sm font-medium text-foreground sm:text-base">
                      {t(`benefits.${benefit.translationKey}`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
