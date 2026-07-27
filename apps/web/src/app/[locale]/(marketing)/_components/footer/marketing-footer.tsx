"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { navItems } from "@/app/[locale]/(marketing)/_components/header/navigation";
import Container from "@/app/components/layout/container";
import ButtonLink from "@/app/components/common/button-link/button-link";

export interface FooterProps {
  children?: React.ReactNode;
}

export default function MarketingFooter({}: FooterProps) {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-10 md:py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <Link
              href="/"
              aria-label={t("marketing.footer.home")}
              className="
                group inline-flex items-center
                rounded-lg
                text-3xl font-black italic tracking-tighter
                text-foreground
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
            >
              <span className="transition-colors duration-200 group-hover:text-foreground/75">
                F
              </span>

              <span className="text-red-500 transition-colors duration-200 group-hover:text-red-600">
                1
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/65 md:text-base">
              {t("marketing.footer.description")}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("marketing.footer.navTitle")}
            </h2>

            <nav className="mt-4" aria-label={t("marketing.footer.label")}>
              <ul className="flex flex-col gap-3">
                {navItems.map(({ href, translationKey }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="
                        group inline-flex items-center
                        text-sm font-medium text-foreground/65
                        transition-colors duration-200
                        hover:text-red-500
                        focus-visible:rounded-sm
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-ring
                      "
                    >
                      <span
                        aria-hidden="true"
                        className="
                          mr-0 h-px w-0 bg-red-500
                          transition-all duration-200
                          group-hover:mr-2 group-hover:w-4
                        "
                      />

                      {t(translationKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("marketing.footer.accountTitle")}
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              <ButtonLink href="/login" variant="outline" fullWidth>
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

              <ButtonLink href="/register" fullWidth>
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
