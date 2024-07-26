import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext(
  {} as {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
