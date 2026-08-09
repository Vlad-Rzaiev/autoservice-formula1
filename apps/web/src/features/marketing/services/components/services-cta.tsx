import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCircleCheck,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

import { cn } from "@/lib";
import { routes, siteConfig } from "@/config";
import { benefits, BenefitList } from "@/features/marketing/services";
import { Section, Container } from "@/components/layout";
import { ButtonLink } from "@/components/common";
import { buttonVariants } from "@/components/ui";

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

              <BenefitList
                items={benefits}
                variant="dark"
                getLabel={(translationKey) => t(`benefits.${translationKey}`)}
              />
            </div>

            <div
              className="
                flex flex-col gap-3
                sm:flex-row lg:min-w-64 lg:flex-col
              "
            >
              <ButtonLink
                href={routes.marketing.booking}
                variant="ctaPrimary"
                className="w-full sm:w-auto"
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  aria-hidden="true"
                  className="shrink-0 text-base"
                />

                {t("booking")}
              </ButtonLink>

              <a
                href={siteConfig.phone.href}
                className={cn(
                  buttonVariants({
                    variant: "ctaOutline",
                    size: "cta-lg",
                  }),
                  "w-full sm:w-auto",
                )}
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
