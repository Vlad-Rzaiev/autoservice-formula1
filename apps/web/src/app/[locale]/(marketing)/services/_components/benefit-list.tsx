import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { BenefitItem } from "@/app/[locale]/(marketing)/services/lib/service-benefit-items";

import {
  benefitFontAwesomeIconVariants,
  benefitIconVariants,
  benefitItemVariants,
  benefitListVariants,
  benefitTextVariants,
} from "@/app/[locale]/(marketing)/services/lib/benefit-list-variants";

type BenefitListVariantProps = VariantProps<typeof benefitListVariants>;

export interface BenefitListProps extends BenefitListVariantProps {
  items: readonly BenefitItem[];
  getLabel: (translationKey: BenefitItem["translationKey"]) => string;
  className?: string;
}

export default function BenefitList({
  items,
  getLabel,
  variant = "default",
  className,
}: BenefitListProps) {
  return (
    <ul className={cn(benefitListVariants({ variant }), className)}>
      {items.map((benefit) => (
        <li
          key={benefit.translationKey}
          className={benefitItemVariants({ variant })}
        >
          <span className={benefitIconVariants({ variant })}>
            <FontAwesomeIcon
              icon={benefit.icon}
              aria-hidden="true"
              className={benefitFontAwesomeIconVariants({ variant })}
            />
          </span>

          <span className={benefitTextVariants({ variant })}>
            {getLabel(benefit.translationKey)}
          </span>
        </li>
      ))}
    </ul>
  );
}
