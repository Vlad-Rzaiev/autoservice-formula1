import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export interface ButtonLoaderProps {
  children?: string;
}

function ButtonLoader({ children }: ButtonLoaderProps) {
  return (
    <>
      {children}
      <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
    </>
  );
}

export { ButtonLoader };
