'use client';

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface MobileMenuContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  closeMenu: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

interface MobileMenuProviderProps {
  children: ReactNode;
}

export function MobileMenuProvider({ children }: MobileMenuProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo<MobileMenuContextValue>(
    () => ({
      isOpen,
      setIsOpen,
      closeMenu,
    }),
    [closeMenu, isOpen],
  );

  return (
    <MobileMenuContext.Provider value={contextValue}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu(): MobileMenuContextValue {
  const contextValue = useContext(MobileMenuContext);

  if (!contextValue) {
    throw new Error('useMobileMenu must be used inside MobileMenuProvider');
  }

  return contextValue;
}
