import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCircleCheck,
  faClipboardCheck,
  faMagnifyingGlass,
  faPhoneVolume,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import Container from "@/app/components/layout/container";
import Section from "@/app/components/layout/section";

interface CtaBenefit {
  translationKey: "diagnostics" | "approval" | "warranty";
  icon: IconDefinition;
}

const ctaBenefits = [
  {
    translationKey: "diagnostics",
    icon: faMagnifyingGlass,
  },
  {
    translationKey: "approval",
    icon: faClipboardCheck,
  },
  {
    translationKey: "warranty",
    icon: faShieldHalved,
  },
] as const satisfies readonly CtaBenefit[];

export default function ServicesCta() {
  const t = useTranslations("services.allServices.cta");

  return (
    <Section noTopPadding>
      <Container>
        <div
          className="
            relative overflow-hidden rounded-3xl
            bg-neutral-950 px-6 py-10 text-white
            shadow-[0_30px_80px_-40px_rgba(220,38,38,0.65)]
            sm:px-10 sm:py-12
            lg:px-14 lg:py-14
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute -right-24 -top-28 size-80
              rounded-full bg-red-600/25 blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute -bottom-32 left-1/3 size-72
              rounded-full bg-red-600/10 blur-3xl
            "
          />

          <div
            className="
              relative grid items-center gap-10
              lg:grid-cols-[minmax(0,1fr)_auto]
              lg:gap-16
            "
          >
            <div className="max-w-3xl">
              <div
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-red-500/30 bg-red-500/10
                  px-4 py-2 text-sm font-semibold text-red-400
                "
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  aria-hidden="true"
                  className="shrink-0 text-sm"
                />

                {t("eyebrow")}
              </div>

              <h2
                className="
                  mt-5 text-3xl font-bold tracking-tight
                  sm:text-4xl
                "
              >
                {t("title")}
              </h2>

              <p
                className="
                  mt-5 max-w-2xl text-base leading-7
                  text-neutral-300 sm:text-lg sm:leading-8
                "
              >
                {t("description")}
              </p>

              <ul
                className="
                  mt-7 grid gap-3
                  sm:grid-cols-3
                "
              >
                {ctaBenefits.map((benefit) => {
                  const BenefitIcon = benefit.icon;

                  return (
                    <li
                      key={benefit.translationKey}
                      className="
                        flex items-center gap-3
                        text-sm text-neutral-200
                      "
                    >
                      <span
                        className="
                          flex size-9 shrink-0 items-center
                          justify-center rounded-lg
                          bg-red-600/15 text-red-400
                        "
                      >
                        <FontAwesomeIcon
                          icon={benefit.icon}
                          aria-hidden="true"
                          className="shrink-0 text-base"
                        />
                      </span>

                      <span>{t(`benefits.${benefit.translationKey}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              className="
                flex flex-col gap-3
                sm:flex-row lg:min-w-64 lg:flex-col
              "
            >
              <Link
                href="/booking"
                className="
                  inline-flex min-h-12 items-center
                  justify-center gap-2 rounded-xl
                  bg-red-600 px-6 py-3
                  text-sm font-semibold text-white
                  shadow-[0_14px_35px_-16px_rgba(220,38,38,0.95)]
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-red-700
                  active:translate-y-0 active:scale-[0.98]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-red-500
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-neutral-950
                "
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  aria-hidden="true"
                  className="shrink-0 text-base"
                />

                {t("booking")}
              </Link>

              <a
                href="tel:+48777777777"
                className="
                  inline-flex min-h-12 items-center
                  justify-center gap-2 rounded-xl
                  border border-white/15 bg-white/5
                  px-6 py-3 text-sm font-semibold
                  text-white transition-all duration-200
                  hover:border-white/25 hover:bg-white/10
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/70
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-neutral-950
                "
              >
                <FontAwesomeIcon
                  icon={faPhoneVolume}
                  aria-hidden="true"
                  className="
                    shrink-0 text-base
                    animate-phone-ring
                    motion-reduce:animate-none
                  "
                />

                {t("call")}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
