import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface WarrantyPeriodValueProps {
  icon: IconProp;
  value: string;
  label: string;
}

function WarrantyPeriodValue({ icon, value, label }: WarrantyPeriodValueProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-success text-success-foreground">
        <FontAwesomeIcon icon={icon} className="size-5" aria-hidden="true" />
      </div>

      <div>
        <div className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </div>

        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export { WarrantyPeriodValue };
