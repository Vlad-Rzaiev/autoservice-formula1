import { CarFront, Cog, Disc3, ScanSearch, Settings, Zap } from "lucide-react";

export const servicesItems = [
  {
    id: "diagnostics",
    title: "marketing.services.cards.diagnostics.title",
    description: "marketing.services.cards.diagnostics.description",
    icon: ScanSearch,
  },
  {
    id: "engine-repair",
    title: "marketing.services.cards.engine-repair.title",
    description: "marketing.services.cards.engine-repair.description",
    icon: Settings,
  },
  {
    id: "chassis-repair",
    title: "marketing.services.cards.chassis-repair.title",
    description: "marketing.services.cards.chassis-repair.description",
    icon: CarFront,
  },
  {
    id: "brake-system",
    title: "marketing.services.cards.brake-system.title",
    description: "marketing.services.cards.brake-system.description",
    icon: Disc3,
  },
  {
    id: "transmission",
    title: "marketing.services.cards.transmission.title",
    description: "marketing.services.cards.transmission.description",
    icon: Cog,
  },
  {
    id: "auto-electrics",
    title: "marketing.services.cards.auto-electrics.title",
    description: "marketing.services.cards.auto-electrics.description",
    icon: Zap,
  },
] as const;

export type ServiceItems = (typeof servicesItems)[number];
