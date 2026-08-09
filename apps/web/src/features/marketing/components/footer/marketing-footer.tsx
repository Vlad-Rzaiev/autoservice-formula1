import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

import { BrandLogo, ButtonLink } from "@/components/common";
import { Container } from "@/components/layout";
import { MarketingNavigation } from "@/features/marketing";
import { routes } from "@/config";

export default function MarketingFooter() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-10 md:py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <BrandLogo variant="footer" />

            <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/65 md:text-base">
              {t("marketing.footer.description")}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("marketing.footer.navTitle")}
            </h2>

            <MarketingNavigation variant="footer" />
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("marketing.footer.accountTitle")}
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              <ButtonLink
                href={routes.auth.login}
                variant="ctaOutline"
                fullWidth
              >
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  aria-hidden="true"
                  className="
                    text-xl shrink-0 pr-2
                    transition-transform duration-200
                    group-hover:translate-x-0.5
                  "
                />
                {t("auth.login.loginBtn")}
              </ButtonLink>

              <ButtonLink href={routes.auth.register} fullWidth>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  aria-hidden="true"
                  className="
                    text-xl shrink-0 pr-2
                    transition-transform duration-200
                    group-hover:scale-110
                  "
                />
                {t("auth.reg.regBtn")}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div
          className="
            mt-10 flex flex-col gap-4
            border-t border-border pt-6
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p className="text-sm text-foreground/55">
            © {currentYear} F1 AutoService. {t("marketing.footer.copyright")}
          </p>

          <ButtonLink href="#top" variant="subtle" size="compact">
            {t("marketing.footer.backToTop")}

            <FontAwesomeIcon
              icon={faArrowUp}
              aria-hidden="true"
              className="
                text-sm shrink-0
                transition-transform duration-200
                group-hover:-translate-y-1
              "
            />
          </ButtonLink>
        </div>
      </Container>
    </footer>
  );
}
