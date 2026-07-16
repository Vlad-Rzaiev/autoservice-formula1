import { ReceiptText, ScanSearch, ShieldCheck, Wrench } from "lucide-react";

export const cardsItems = [
  {
    id: 1,
    title: "marketing.why-us.cards.specialists.title",
    description: "marketing.why-us.cards.specialists.description",
    icon: Wrench,
  },
  {
    id: 2,
    title: "marketing.why-us.cards.diagnostics.title",
    description: "marketing.why-us.cards.diagnostics.description",
    icon: ScanSearch,
  },
  {
    id: 3,
    title: "marketing.why-us.cards.prices.title",
    description: "marketing.why-us.cards.prices.description",
    icon: ReceiptText,
  },
  {
    id: 4,
    title: "marketing.why-us.cards.warranty.title",
    description: "marketing.why-us.cards.warranty.description",
    icon: ShieldCheck,
  },
] as const;

export type CardItems = (typeof cardsItems)[number];
