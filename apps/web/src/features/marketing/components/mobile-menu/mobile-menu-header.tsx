import { BrandLogo, IconButton } from "@/components/common";
import { DrawerClose, DrawerHeader, DrawerTitle } from "@/components/ui";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default function MobileMenuHeader({}) {
  const t = useTranslations();

  return (
    <DrawerHeader
      className="
            relative flex-row items-center justify-between
            border-b border-border
            px-4 py-3
            sm:px-5
          "
    >
      <DrawerTitle>
        <BrandLogo variant="mobileMenu" />
      </DrawerTitle>

      <DrawerClose
        render={
          <IconButton aria-label={t("mobile-menu.close")}>
            <FontAwesomeIcon
              icon={faXmark}
              aria-hidden="true"
              className="
                    text-lg
                    transition-transform duration-200
                    group-hover:rotate-90
                    group-hover:scale-110
                  "
            />
          </IconButton>
        }
      ></DrawerClose>

      <span
        aria-hidden="true"
        className="
              absolute inset-x-0 bottom-0 h-px
              bg-linear-to-r
              from-transparent
              via-red-500/60
              to-transparent
            "
      />
    </DrawerHeader>
  );
}
