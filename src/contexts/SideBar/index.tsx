import { createContext, useContext, useState, ReactNode } from "react";
import { SidebarContextType } from "./types";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const resetSidebar = () => {
    setActiveIndex(-1);
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{ activeIndex, setActiveIndex, isOpen, setIsOpen, resetSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
