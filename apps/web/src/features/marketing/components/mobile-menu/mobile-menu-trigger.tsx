import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { DrawerTrigger } from "@/components/ui";
import { IconButton } from "@/components/common";

interface MobileMenuTriggerProps {
  isOpen: boolean;
}

export default function MobileMenuTrigger({ isOpen }: MobileMenuTriggerProps) {
  const t = useTranslations();

  return (
    <DrawerTrigger
      render={
        <IconButton aria-label={t("mobile-menu.open")} aria-expanded={isOpen}>
          <FontAwesomeIcon
            icon={faBarsStaggered}
            aria-hidden="true"
            className="
                relative text-lg
                transition-transform duration-200
                group-hover:scale-110
                group-focus-visible:scale-110
              "
          />
        </IconButton>
      }
    />
  );
}
