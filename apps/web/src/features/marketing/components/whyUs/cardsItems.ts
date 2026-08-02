import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFileInvoice,
  faMagnifyingGlassChart,
  faScrewdriverWrench,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

export type WhyUsCardItem = {
  id: number;
  title: string;
  description: string;
  icon: IconDefinition;
};

export const cardsItems = [
  {
    id: 1,
    title: "marketing.why-us.cards.specialists.title",
    description: "marketing.why-us.cards.specialists.description",
    icon: faScrewdriverWrench,
  },
  {
    id: 2,
    title: "marketing.why-us.cards.diagnostics.title",
    description: "marketing.why-us.cards.diagnostics.description",
    icon: faMagnifyingGlassChart,
  },
  {
    id: 3,
    title: "marketing.why-us.cards.prices.title",
    description: "marketing.why-us.cards.prices.description",
    icon: faFileInvoice,
  },
  {
    id: 4,
    title: "marketing.why-us.cards.warranty.title",
    description: "marketing.why-us.cards.warranty.description",
    icon: faShieldHalved,
  },
] as const satisfies readonly WhyUsCardItem[];

export type CardItems = (typeof cardsItems)[number];
