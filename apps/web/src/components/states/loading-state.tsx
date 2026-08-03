import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { StateShell } from "@/components/states";

export interface LoadingStateProps {
  title: string;
  description?: string;
  className?: string;
}

export default function LoadingState({
  title,
  description,
  className,
}: LoadingStateProps) {
  return (
    <StateShell
      title={title}
      description={description}
      variant="loading"
      className={className}
      icon={
        <>
          <span
            className="
              absolute inset-0 animate-ping rounded-2xl
              bg-red-500/10
              motion-reduce:animate-none
            "
          />

          <FontAwesomeIcon
            icon={faSpinner}
            className="
              relative shrink-0 animate-spin text-2xl
              motion-reduce:animate-none
            "
          />
        </>
      }
      titleClassName="font-medium"
      descriptionClassName="mt-1 leading-normal"
    />
  );
}
