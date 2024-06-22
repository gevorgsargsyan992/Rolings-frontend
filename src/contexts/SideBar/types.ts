export interface SidebarContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  resetSidebar: () => void;
}