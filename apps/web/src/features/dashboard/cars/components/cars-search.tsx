import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';

interface CarsSearchProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function CarsSearch({
  value,
  placeholder,
  onChange,
}: CarsSearchProps) {
  return (
    <div className="relative w-full">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
      />

      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 pl-9"
      />
    </div>
  );
}
