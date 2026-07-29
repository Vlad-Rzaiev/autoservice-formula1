import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faClipboardCheck,
  faMagnifyingGlassChart,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export type BenefitTranslationKey = "diagnostics" | "approval" | "warranty";

export interface BenefitItem {
  translationKey: BenefitTranslationKey;
  icon: IconDefinition;
}

export const benefits = [
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
