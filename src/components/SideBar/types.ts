export interface SidebarItem {
  title: string;
  iconPath: JSX.Element;
  link: string;
}

export interface LeftSidebarProps {
  items: SidebarItem[];
}